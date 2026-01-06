import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import uploadRoute from "./routes/upload.js";
import clientesRoutes from "./routes/cliente.js";

const app = express();


app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

app.use("/upload", uploadRoute);
app.use("/", clientesRoutes);

app.listen(3003, () => {
  console.log("🚀 Servidor rodando na porta 3003");
});
