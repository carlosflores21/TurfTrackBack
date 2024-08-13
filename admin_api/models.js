const mongoose = require('mongoose');
const { adminSchema } = require('./schemas');

const adminModel = mongoose.model('admin', adminSchema);

module.exports = {adminModel};