const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://biscalchinguilherme_db_user:V7NI9YjZTWLJG2GR@cluster0.hgcnat6.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Erro MongoDB:", err));

app.use("/upload", uploadRoute);

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
    console.log("Está funcionando!!!!");
});
