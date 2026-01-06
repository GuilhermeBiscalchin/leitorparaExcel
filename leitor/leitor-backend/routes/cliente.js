import express from "express";
import Cliente from "../models/Cliente.js";

const router = express.Router();

router.get("/clientes", async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
});

export default router;
