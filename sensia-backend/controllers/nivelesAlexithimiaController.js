// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getNivelesAlexithimia,
  createNivelAlexithimia,
  deleteNivelAlexithimiaById,
} from "../database/models/nivelesAlexithimiaModel.js";

export async function getNivelesAlexithimiaController(req, res) {
  try {
    const niveles = await getNivelesAlexithimia();
    res.json(niveles);
  } catch (err) {
    console.error("Error al obtener los niveles de alexithimia:", err);
    res.status(500).json({ error: "Error al obtener los niveles de alexithimia" });
  }
}

export async function createNivelAlexithimiaController(req, res) {
  try {
    const { nivel, descripcion, rango_minimo, rango_maximo } = req.body;
    if (!nivel || !descripcion || !rango_minimo || !rango_maximo) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newNivel = await createNivelAlexithimia(nivel, descripcion, rango_minimo, rango_maximo);
    res.status(201).json({ message: "Nivel de alexithimia creado", nivel: newNivel });
  } catch (err) {
    console.error("🔥 ERROR REAL:", err);
    res.status(500).json({
      error: "Error al crear el nivel de alexithimia",
      detalle: err.message,
    });
  }
}

export async function deleteNivelAlexithimiaController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteNivelAlexithimiaById(id);
    res.json({ message: "Nivel de alexithimia eliminado", result });
  } catch (err) {
    console.error("Error al eliminar el nivel de alexithimia:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al eliminar el nivel de alexithimia", detalle: err.message });
  }
}
