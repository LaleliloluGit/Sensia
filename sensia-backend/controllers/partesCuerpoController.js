// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getPartesCuerpo,
  createPartesCuerpo,
  deletePartesCuerpoById,
} from "../database/models/partesCuerpoModel.js";

export async function getPartesCuerpoController(req, res) {
  try {
    const partesCuerpo = await getPartesCuerpo();
    res.json(partesCuerpo);
  } catch (err) {
    console.error("Error al obtener las partes del cuerpo:", err); 
    res.status(500).json({ error: "Error al obtener las partes del cuerpo" });
  }
}

export async function createPartesCuerpoController(req, res) {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newParteCuerpo = await createPartesCuerpo(
      nombre,
      descripcion,
    );
    res.status(201).json({ message: "Parte del cuerpo creada", parteCuerpo: newParteCuerpo });
  } catch (err) {
    console.error("🔥 ERROR REAL:", err);
    res.status(500).json({
      error: "Error al crear la parte del cuerpo",
      detalle: err.message,
    });
  }
}

export async function deletePartesCuerpoController(req, res) {
  try {
    const { id } = req.params;
    const result = await deletePartesCuerpoById(id);
    res.json({ message: "Parte del cuerpo eliminada", result });
  } catch (err) {
    console.error("Error al eliminar la parte del cuerpo:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al eliminar la parte del cuerpo" });
  }
}
