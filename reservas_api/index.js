const express = require("express")
const userService = require("./services/userService");
const uri = 'marcelo@cluster0.8ad62kg.mongodb.net/usuarios_api?retryWrites=true&w=majority&appName=Cluster0'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { reservasModel } = require('./models');
app.get('/', (req, res) => { res.send("Registrando Reserva!!"); })

app.get('/reserva', async(req, res)=>{
  const reserva = await reservasModel.find({});
  res.json( reserva );
});
app.get('/reserva/:id_usuario', async(req, res)=>{
  const reserva = await reservasModel.find({id_usuario:req.params.id_usuario});
  try {
    res.json( reserva[0] );
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/reserva', async(req, res)=>{
  try {
    const {id_usuario, id_cancha, fecha, hora_inicio, hora_fin, status} = req.body;

    let userreserva=null;
    userreserva = await userService.get(id_usuario);
    if(! userreserva )  throw ("Usuario no Registrado");

    const reserva = new reservasModel({ id_usuario, id_cancha, fecha, hora_inicio, hora_fin, status});
    const data = await reserva.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Usuario no Registrado' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

