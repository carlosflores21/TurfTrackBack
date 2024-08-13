const mongoose = require('mongoose');
const { reservasSchema } = require('./schemas');

const reservasModel = mongoose.model('reservas', reservasSchema);

module.exports = {reservasModel };