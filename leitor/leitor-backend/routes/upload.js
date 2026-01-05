const express = require("express");
const multer = require("multer");
const Arquivo = require("../models/arquivo");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/arquivos");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("arquivo"), async (req, res) => {
    try {
        const file = req.file;

        const novoArquivo = new Arquivo({
            nomeOriginal: file.originalname,
            nomeServidor: file.filename,
            tipo: file.mimetype,
            tamanho: file.size
        });

        await novoArquivo.save();

        res.json({
            sucesso: true,
            mensagem: "Arquivo salvo com sucesso"
        });

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;
