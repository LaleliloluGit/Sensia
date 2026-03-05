// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getRegistrosEmocionales,
  createRegistroEmocional,
  deleteRegistroEmocionalById,
} from "../database/models/registrosEmocionalesModel.js";

export async function getRegistrosEmocionalesController(req, res) {
  try {
    const registros = await getRegistrosEmocionales();
    res.json(registros);
  } catch (err) {
    console.error("Error al obtener los registros emocionales:", err);
    res
      .status(500)
      .json({ error: "Error al obtener los registros emocionales" });
  }
}

export async function createRegistroEmocionalController(req, res) {
  try {
    const {
      usuario_id,
      emocion_id,
      parte_cuerpo_id,
      descripcion_situacion,
      fecha_hora,
      intensidad,
    } = req.body;
    if (
      !usuario_id ||
      !emocion_id ||
      !parte_cuerpo_id ||
      !descripcion_situacion ||
      !fecha_hora ||
      !intensidad
    ) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newRegistroEmocional = await createRegistroEmocional(
      usuario_id,
      emocion_id,
      parte_cuerpo_id,
      descripcion_situacion,
      fecha_hora,
      intensidad,
    );
    res
      .status(201)
      .json({
        message: "Registro emocional creado",
        registro: newRegistroEmocional,
      });
  } catch (err) {
    console.error("🔥 ERROR REAL:", err);
    res.status(500).json({
      error: "Error al crear el registro emocional",
      detalle: err.message,
    });
  }
}

export async function deleteRegistroEmocionalController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteRegistroEmocionalById(id);
    res.json({ message: "Registro emocional eliminado", result });
  } catch (err) {
    console.error("Error al eliminar el registro emocional:", err); // Log the error for debugging
    res
      .status(500)
      .json({
        error: "Error al eliminar el registro emocional",
        detalle: err.message,
      });
  }
}
