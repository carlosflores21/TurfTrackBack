const express = require("express")
const uri = 'mongodb+srv://carlosflores:mongodbcf@cluster0.rzotvjb.mongodb.net'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { usuarioModel } = require('./models');
app.get('/', (req, res) => { res.send("Usuarios"); })

app.get('/usuario', async(req, res)=>{
  const usuario = await usuarioModel.find({});
  res.json( usuario );
});
app.get('/usuario/:codeStudent', async(req, res)=>{
  const person = await usuarioModel.find({codeStudent:req.params.codeStudent});
  res.json( person );
});
app.post('/usuario', async(req, res)=>{
  try {
    const codeStudent = req.body.codeStudent;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const gender = req.body.gender;
    const habitacion = req.body.habitacion;
    const status = req.body.status;
    
    const person = new usuarioModel({ codeStudent,name,lastname,gender,status, habitacion});

    const data = await person.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

