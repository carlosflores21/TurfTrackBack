const mongoose = require('mongoose');
const { internadoSchema } = require('./schemas');

const internadoModel = mongoose.model('internado', internadoSchema);

module.exports = {internadoModel };