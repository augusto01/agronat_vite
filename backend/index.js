const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


//CONEXION A LA DB - REVISAR ARCHIVO .ENV 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define el modelo de usuario
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'users' }); // Nombre de la coleccion en la base de datos !


const User = mongoose.model('User', UserSchema);

// Rutas
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});


/**==================LOGIN===================== */




app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('email and password are required');
    }

    try {

        const user = await User.findOne({email});
        console.log('Usuario encontrado:', user);
        if (!user) {
        console.log('Usuario no encontrado con el email:', email);
        return res.status(401).send('Invalid credentials');
        }

        


        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});

const puerto = 5000;
app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto: ' + puerto);
});
