// Importamos mongoose para definir el esquema de usuario
const mongoose = require('mongoose');

<<<<<<< HEAD
// Definimos el esquema de usuario con los campos y sus tipos
=======
>>>>>>> b3a0c4795a63af82200c7e686df73b8d2f4b1b6c
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

<<<<<<< HEAD
// Exportamos el esquema de usuario para que pueda ser utilizado en otros archivos
=======
>>>>>>> b3a0c4795a63af82200c7e686df73b8d2f4b1b6c
module.exports = { usuarioSchema };
