const cidadesDiv = document.getElementById("cidades");
const tbody = document.querySelector("#tabela tbody");

window.addEventListener("DOMContentLoaded", carregarCidades);

// 1️⃣ Carregar cidades
async function carregarCidades() {
    const res = await fetch("http://localhost:3003/clientes/porcidade");
    const cidades = await res.json();

    cidadesDiv.innerHTML = "";

    cidades.forEach(c => {
        const div = document.createElement("div");
        div.className = "cidade";
        div.textContent = `${c._id} (${c.total})`;

        div.addEventListener("click", () => {
            carregarClientesDaCidade(c._id);
        });

        cidadesDiv.appendChild(div);
    });
}

// 2️⃣ Carregar clientes da cidade clicada
async function carregarClientesDaCidade(cidade) {
    const res = await fetch(`http://localhost:3003/clientes/cidade/${cidade}`);
    const clientes = await res.json();

    tbody.innerHTML = "";

    clientes.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.cnpj}</td>
            <td>${c.razaoSocial}</td>
            <td>${c.cidade}</td>
            <td>${c.status}</td>
        `;
        tbody.appendChild(tr);
    });
}
