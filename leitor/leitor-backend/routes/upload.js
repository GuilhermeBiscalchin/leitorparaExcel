import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import Cliente from "../models/Cliente.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ erro: "Arquivo não enviado" });
        }

        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        console.log("📄 Linhas lidas do Excel:", rows.length);

        if (rows.length === 0) {
            return res.status(400).json({ erro: "Planilha vazia" });
        }

        const clientes = rows.map(row => {
            const colunas = {};

            Object.keys(row).forEach(key => {
                const normalizada = key
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "");

                colunas[normalizada] = row[key];
            });

            return {
                cnpj: String(colunas.cnpj || "").trim(),
                razaoSocial: colunas.razaosocial || "",
                cidade: colunas.cidade || "",
                status: colunas.status || ""
            };
        });

        const inseridos = await Cliente.insertMany(clientes);

        console.log("✅ Clientes salvos:", inseridos.length);

        res.json({
            mensagem: "Planilha processada com sucesso",
            total: inseridos.length
        });

    } catch (err) {
        console.error("❌ Erro no upload:", err);
        res.status(500).json({ erro: "Erro ao processar planilha" });
    }
});

export default router;
