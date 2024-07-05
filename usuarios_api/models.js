const mongoose = require('mongoose');
const { usuarioSchema } = require('./schemas');

const usuarioModel = mongoose.model('usuario', usuarioSchema);

module.exports = {usuarioModel};