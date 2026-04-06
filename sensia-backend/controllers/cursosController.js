// import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';
// import sendVerificationEmail from './nodemailer.js';

import {
  getCursos,
  getCursosById,
  getCursosByCategory,
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

export async function getCursosByIdController(req, res) {
  try {
    const {id} = req.params;
    const cursos = await getCursosById(id);
    res.json(cursos);
  } catch (err) {
    console.error("Error al obtener los cursos:", err); 
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
}

export async function getCursosByCategoryController(req, res) {
  try {
    const {categoria} = req.params;
    const cursos = await getCursosByCategory(categoria);
    res.json(cursos);
  } catch (err) {
    console.error("Error al obtener los cursos:", err); 
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
}

export async function createCursoController(req, res) {
  try {
    const { titulo, descripcion, contenido, categoria } = req.body;
    if (!titulo || !descripcion || !contenido || !categoria) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newCurso = await createCurso(
      titulo,
      descripcion,
      contenido,
      categoria
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
