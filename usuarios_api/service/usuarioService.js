// Importamos axios para realizar solicitudes HTTP a otros servicios
const axios = require('axios');

// Importamos el modelo de usuario
const { usuarioModel } = require('../models');

// URL del servicio de reservas al que enviaremos los datos del usuario
const RESERVA_SERVICE_URL = 'http://localhost:8081/endpoint';

// Función para obtener un usuario por su ID
const getUsuarioById = async (id_usuario) => {
  return await usuarioModel.findOne({ id_usuario });
};

// Función para guardar un nuevo usuario en la base de datos
const saveUsuario = async (usuarioData) => {
  const usuario = new usuarioModel(usuarioData);
  return await usuario.save();
};

// Función para enviar los datos de un usuario al servicio de reservas
const sendUsuarioToReservaService = async (usuario) => {
  try {
    const response = await axios.post(RESERVA_SERVICE_URL, usuario);
    console.log('Datos enviados al servicio de reservas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error enviando datos al servicio de reservas:', error);
    throw new Error('Error enviando datos al servicio de reservas');
  }
};

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
  getUsuarioById,
  saveUsuario,
  sendUsuarioToReservaService,
};
