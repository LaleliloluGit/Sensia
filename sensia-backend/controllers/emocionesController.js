// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getEmociones,
  getEmocionesPrincipales,
  getEmocionesByEmocionSup,
  createEmocion,
  deleteEmocionById,
} from "../database/models/emocionesModel.js";

export async function getEmocionesController(req, res) {
  try {
    const emociones = await getEmociones();
    res.json(emociones);
  } catch (err) {
    console.error("Error al obtener las emociones:", err);
    res.status(500).json({ error: "Error al obtener las emociones" });
  }
}

export async function getEmocionesPrincipalesController(req, res) {
  try {
    const emociones = await getEmocionesPrincipales();
    res.json(emociones);
  } catch (err) {
    console.error("Error al obtener las emociones principales:", err);
    res
      .status(500)
      .json({ error: "Error al obtener las emociones principales" });
  }
}

export async function getEmocionesByEmocionSupController(req, res) {
  try {
    const { emocion_sup } = req.params;
    const emociones = await getEmocionesByEmocionSup(emocion_sup);
    res.json(emociones);
  } catch (err) {
    console.error("Error al obtener las emociones por emocion_sup:", err);
    res
      .status(500)
      .json({ error: "Error al obtener las emociones por emocion_sup" });
  }
}

export async function createEmocionController(req, res) {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newEmocion = await createEmocion(titulo, descripcion);
    res.status(201).json({ message: "Emocion creada", emocion: newEmocion });
  } catch (err) {
    console.error("🔥 ERROR REAL:", err);
    res.status(500).json({
      error: "Error al crear la emocion",
      detalle: err.message,
    });
  }
}

export async function deleteEmocionController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteEmocionById(id);
    res.json({ message: "Emocion eliminada", result });
  } catch (err) {
    console.error("Error al eliminar la emocion:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al eliminar la emocion" });
  }
}
