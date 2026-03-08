import argon2 from "argon2";
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getUsuarios,
  getUsuarioByUsername,
  createUsuario,
  deleteUsuarioById,
} from "../database/models/usuariosModel.js";

export async function getUsuariosController(req, res) {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error("Error al obtener los usuarios:", err);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
}

export async function getUsuarioByUsernameController(req, res) {
  try {
    const { username } = req.params;
    const usuario = await getUsuarioByUsername(username);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (err) {
    console.error("Error al obtener el usuario por username:", err);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
}

export async function loginUsuarioController(req, res) {
  try {
    const { username, password } = req.body;

    const usuario = await getUsuarioByUsername(username);

    if (!usuario) {
      return res
        .status(401)
        .json({ error: "Usuario incorrecto" });
    }

    const passwordValida = await argon2.verify(usuario.password, password);

    if (!passwordValida) {
      return res
        .status(401)
        .json({ error: "Contraseña incorrectos" });
    }

    // const token = jwt.sign(
    //     { id: usuario._id, username: usuario.username },
    //     process.env.JWT_SECRET || 'tu_secreto_super_secreto',
    //     { expiresIn: '5h' } // opcional
    // );

    // return res.json({ usuario, token })
    return res.json({ usuario });
  } catch (err) {
    console.error("Error en el login:", err); // Log the error for debugging
    res.status(500).json({ error: "Error en el login" });
  }
}


export async function createUsuarioController(req, res) {
  try {
    const { nombre, apellido1, apellido2, username, email, password } = req.body;
    
    if (!nombre || !apellido1 || !username || !email || !password) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const passwordHashed = await argon2.hash(password);

    const newUsuario = await createUsuario({
      nombre,
      apellido1,
      apellido2: apellido2 || '',
      username,
      email,
      password: passwordHashed,
  });
    res.status(201).json({ message: "Usuario creado", usuario: newUsuario });
  } catch (err) {

    console.error("🔥 ERROR REAL:", err);
    
    res.status(500).json({
      error: "Error al crear el usuario",
      detalle: err.message,
    });
  }
}

export async function deleteUsuarioController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteUsuarioById(id);
    res.json({ message: "Usuario eliminado", result });
  } catch (err) {
    console.error("Error al eliminar el usuario:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
}
