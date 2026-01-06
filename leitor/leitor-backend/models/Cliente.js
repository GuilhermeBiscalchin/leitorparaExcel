import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    cnpj: String,
    razaoSocial: String,
    cidade: String,
    status: String,
    tag: {
        type: String,
        enum: ["Bom", "Mediano", "Excluir"],
        default: null
    },
    criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model("Cliente", ClienteSchema);
