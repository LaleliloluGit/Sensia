// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getRegistrosCursos,
  getRegistrosCursosByUserId,
  createRegistroCurso,
  deleteRegistroCursoById,
} from "../database/models/registrosCursosModel.js";

export async function getRegistrosCursosController(req, res) {
  try {
    const registros = await getRegistrosCursos();
    res.json(registros);
  } catch (err) {
    console.error("Error al obtener los registros cursos:", err);
    res.status(500).json({ error: "Error al obtener los registros cursos" });
  }
}
export async function getRegistrosCursosByUserIdController(req, res) {
  try {
    const { id } = req.params;
    const registros = await getRegistrosCursosByUserId(id);
    res.json(registros);
  } catch (err) {
    console.error("Error al obtener los registros cursos:", err);
    res.status(500).json({ error: "Error al obtener los registros cursos" });
  }
}

export async function createRegistroCursoController(req, res) {
  try {
    const { usuario_id, curso_id } = req.body;
    if (!usuario_id || !curso_id) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newRegistroCurso = await createRegistroCurso(usuario_id, curso_id);
    res.status(201).json({
      message: "Registro curso creado",
      registro: newRegistroCurso,
    });
  } catch (err) {
    console.error("🔥 ERROR REAL:", err);
    res.status(500).json({
      error: "Error al crear el registro curso",
      detalle: err.message,
    });
  }
}

export async function deleteRegistroCursoController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteRegistroCursoById(id);
    res.json({ message: "Registro curso eliminado", result });
  } catch (err) {
    console.error("Error al eliminar el registro curso:", err); // Log the error for debugging
    res.status(500).json({
      error: "Error al eliminar el registro curso",
      detalle: err.message,
    });
  }
}
