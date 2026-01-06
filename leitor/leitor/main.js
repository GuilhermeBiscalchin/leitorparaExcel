const input = document.getElementById("excelFile");

input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:3003/upload", {
        method: "POST",
        body: formData
    });

    alert("Arquivo enviado para processamento");
});
