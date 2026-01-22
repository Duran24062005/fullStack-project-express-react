import { Router } from "express";


const users_router = Router();


// Registrar un nuevo usuario
users_router.post('/register', (req, res) => {
    res.send("Hola")
});

// 
users_router.get();