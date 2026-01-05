const mongoose = require("mongoose");

const ArquivoSchema = new mongoose.Schema({
  nomeOriginal: String,
  nomeServidor: String,
  tipo: String,
  tamanho: Number,
  dataUpload: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Arquivo", ArquivoSchema);
