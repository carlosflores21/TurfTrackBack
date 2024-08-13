const mongoose = require('mongoose');
const reservaschema = new mongoose.Schema({
  id_Usuario: {
    type: Number,
    required: true
  },
  id_cancha: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora_inicio:{
    type: String,
    required: true
  },
  hora_fin:{
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  });
  module.exports = {reservaschema}