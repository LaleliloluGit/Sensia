// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getCursos,
  createCurso,
  deleteCursoById,
} from "../database/models/cursosModel.js";

export async function getCursosController(req, res) {
  try {
    const cursos = await getCursos();
    res.json(cursos);
  } catch (err) {
    console.error("Error al obtener los cursos:", err); 
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
}

export async function createCursoController(req, res) {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newCurso = await createCurso(
      titulo,
      descripcion,
    );
    res.status(201).json({ message: "Curso creado", curso: newCurso });
  } catch (err) {
    console.error("🔥 ERROR REAL:", err);
    res.status(500).json({
      error: "Error al crear el curso",
      detalle: err.message,
    });
  }
}

export async function deleteCursoController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteCursoById(id);
    res.json({ message: "Curso eliminado", result });
  } catch (err) {
    console.error("Error al eliminar el curso:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al eliminar el curso" });
  }
}
