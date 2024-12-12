const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors");
const UsuarioModel = require ('./models/Usuario');

const app = express();
app.use(express.json());
app.use(cors());

//puerto a utilizar 
const puerto = 3000;

//cadena de conexion a la base de datos
mongoose.connect("mongodb://localhost:27017/agronat");


app.listen(puerto, ()=>{
    console.log("servidor corriendo en el puerto:",puerto);
})

//metodo para el login de usuarios 
app.get ('/registro', (req, res) =>{
    res.render('login');

    

})

app.get ('/signup', (req, res) =>{
    res.render('signup');

    

})