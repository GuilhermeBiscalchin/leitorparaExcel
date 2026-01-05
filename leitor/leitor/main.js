import * as XLSX from "xlsx";

const input = document.getElementById("excelFile");
const tbody = document.querySelector("#tabela tbody");



input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;

// ============================
    // 1️⃣ LEITURA LOCAL (v1.1)
    // ============================

    const reader = new FileReader();

    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, {
            defval: "",
            raw: false
        });

        tbody.innerHTML = "";

        rows.forEach(row => {
            // Normaliza as chaves
            const keys = Object.keys(row).reduce((acc, key) => {
                acc[key.toLowerCase().replace(/\s+/g, '')] = row[key];
                return acc;
            }, {});

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${keys["cnpj"] || ""}</td>
                <td>${keys["razãosocial"] || ""}</td>
                <td>${keys["cidade"] || ""}</td>
                <td>${keys["status"] || ""}</td>
            `;

            tbody.appendChild(tr);
        });
         // ============================
        // 2️⃣ ENVIO PARA O SERVIDOR (v1.2)
        // ============================

        const formData = new FormData();
        formData.append('arquivo',file)

         await fetch("http://localhost:3003/upload", {
            method: "POST",
            body: formData
        });

    };

    reader.readAsArrayBuffer(file);
});
