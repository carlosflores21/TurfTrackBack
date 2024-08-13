const express = require("express")
const uri = 'mongodb+srv://marcelo:marcelo@cluster0.8ad62kg.mongodb.net/usuarios_api?retryWrites=true&w=majority&appName=Cluster0';

const mongoose = require('mongoose');

// Importar el modelo de admin
const { adminModel } = require('./models');
const { getUsuarioByid, addUsuario, updateUsuario, deleteUsuario, saveAdmin } = require('./services/adminService');

// Conectar a MongoDB
mongoose.connect(uri).then(() => {
  console.log('Conexión a MongoDB establecida correctamente');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});
const app = express()
app.use( express.json() )
const port = 8080
app.get('/', (req, res) => { res.send("Admin"); })

app.get('/admin', async(req, res)=>{
  try {
    const admins = await adminModel.find({});
    res.json( admins );
  }	catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener un usuario por id_usuario
app.get('/admin/:id_usuario', async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const usuario = await getUsuarioByid(id_usuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/admin', async (req, res) => {
  try {
    const { id_admin, nombre, email, telefono, contrasena, rol } = req.body;
    const adminData = { id_admin, nombre, email, telefono, contrasena, rol };
    const admin = await saveAdmin(adminData);
    return res.status(201).json(admin);
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar un usuario
app.put('/admin/:id_usuario', async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const usuarioData = req.body;
    const updatedUsuario = await updateUsuario(id_usuario, usuarioData);
    return res.status(200).json(updatedUsuario);
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un usuario
app.delete('/admin/:id_usuario', async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const deletedUsuario = await deleteUsuario(id_usuario);
    return res.status(200).json(deletedUsuario);
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

