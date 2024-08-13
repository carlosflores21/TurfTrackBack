const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    id_admin: {
      type: String,
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
    dni_usuario: {
      type: String,
      required: true
    },
    contrasena: {
      type: String,
      required: true
    },
    rol: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  module.exports = {adminSchema}