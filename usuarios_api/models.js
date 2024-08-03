// Importamos mongoose para manejar la base de datos MongoDB
const mongoose = require('mongoose');
const { usuarioSchema } = require('./schemas');

// Creamos el modelo de usuario utilizando el esquema definido
const usuarioModel = mongoose.model('Usuario', usuarioSchema);

// Exportamos el modelo de usuario para que pueda ser utilizado en otros archivos
module.exports = { usuarioModel };
