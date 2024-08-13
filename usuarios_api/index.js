const express = require("express");
const mongoose = require('mongoose');

// Importar el modelo de usuario
const { usuarioModel } = require('./models');
const { getUsuarioById, saveUsuario, sendUsuarioToReservaService } = require('./service/usuarioService');

const uri = 'mongodb+srv://marcelo:marcelo@cluster0.8ad62kg.mongodb.net/usuarios_api?retryWrites=true&w=majority&appName=Cluster0';

// Conectar a MongoDB
mongoose.connect(uri).then(() => {
  console.log('Conexión a MongoDB establecida correctamente');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

const app = express();
app.use(express.json());
const port = 8080;

app.get('/', (req, res) => {
  res.send("Usuarios");
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await usuarioModel.find({});
    res.json(usuarios);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para obtener un usuario por su ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { id_usuario, nombre, email, telefono, contrasena } = req.body;
    const usuarioData = { id_usuario, nombre, email, telefono, contrasena };

    const usuario = await saveUsuario(usuarioData);
    return res.status(201).json(usuario);
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para enviar los datos de un usuario al servicio de reservas cuando se solicite
app.post('/send-user/:id', async (req, res) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    try {
      const response = await sendUsuarioToReservaService(usuario);
      res.json({ message: 'Datos enviados correctamente', data: response });
    } catch (error) {
      console.error('Error enviando datos al servicio de reservas:', error);
      res.status(500).json({ message: 'Error enviando datos al servicio de reservas' });
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
