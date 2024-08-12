const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  id_usuario: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = { usuarioSchema };
