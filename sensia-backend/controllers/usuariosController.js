// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getUsuarios,
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

export async function createUsuarioController(req, res) {
  try {
    const { nombre, apellido1, apellido2, username, email, password } =
      req.body;
    if (!nombre || !apellido1 || !username || !email || !password) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newUsuario = await createUsuario(
      nombre,
      apellido1,
      apellido2,
      username,
      email,
      password,
    );
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
