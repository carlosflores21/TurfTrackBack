const express = require("express")
const userService = require("./services/userService");
const uri = 'mongodb+srv://carlosflores:mongodbcf@cluster0.rzotvjb.mongodb.net'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { internadoModel } = require('./models');
app.get('/', (req, res) => { res.send("Registrando internadoo!!"); })

app.get('/internado', async(req, res)=>{
  const internado = await internadoModel.find({});
  res.json( internado );
});
app.get('/internado/:numeroHabitacion', async(req, res)=>{
  const internado = await internadoModel.find({numeroHabitacion:req.params.numeroHabitacion});
  try {
    res.json( internado[0] );
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/internado', async(req, res)=>{
  try {
    const {nombreInternado, numeroHabitacion, capacidadHabitacion, codeStudent} = req.body;

    let userinternado=null;
    userinternado = await userService.get(codeStudent);
    if(! userinternado )  throw ("Usuario no Registrado");

    const internado = new internadoModel({ nombreInternado, numeroHabitacion, capacidadHabitacion, codeStudent});
    const data = await internado.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Usuario no Registrado' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

