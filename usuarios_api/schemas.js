// Importamos mongoose para definir el esquema de usuario
const mongoose = require('mongoose');

// Definimos el esquema de usuario con los campos y sus tipos
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

// Exportamos el esquema de usuario para que pueda ser utilizado en otros archivos
module.exports = { usuarioSchema };
