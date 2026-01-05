const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Erro MongoDB:", err));

app.use("/upload", uploadRoute);

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
    console.log("Está funcionando!!!!");
});
