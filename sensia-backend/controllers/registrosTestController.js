// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getRegistrosTests,
  createRegistroTest,
  deleteRegistroTestById,
} from "../database/models/registrosTestsModel.js";

export async function getRegistrosTestsController(req, res) {
  try {
    const registros = await getRegistrosTests();
    res.json(registros);
  } catch (err) {
    console.error("Error al obtener los registros tests:", err);
    res.status(500).json({ error: "Error al obtener los registros tests" });
  }
}

export async function createRegistroTestController(req, res) {
  try {
    const {
      usuario_id,
      respuestas,
      puntuacion_total,
      niveles_alexithimia,
      fecha_hora,
    } = req.body;
    if (
      !usuario_id ||
      !respuestas ||
      !puntuacion_total ||
      !niveles_alexithimia ||
      !fecha_hora
    ) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newRegistroTest = await createRegistroTest(
      usuario_id,
      respuestas,
      puntuacion_total,
      niveles_alexithimia,
      fecha_hora,
    );
    res.status(201).json({
      message: "Registro test creado",
      registro: newRegistroTest,
    });
  } catch (err) {
    console.error("🔥 ERROR REAL:", err);
    res.status(500).json({
      error: "Error al crear el registro test",
      detalle: err.message,
    });
  }
}

export async function deleteRegistroTestController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteRegistroTestById(id);
    res.json({ message: "Registro test eliminado", result });
  } catch (err) {
    console.error("Error al eliminar el registro test:", err); // Log the error for debugging
    res.status(500).json({
      error: "Error al eliminar el registro test",
      detalle: err.message,
    });
  }
}
