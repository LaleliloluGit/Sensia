import { db } from "../db.js";

export async function getCursos() {
  const [rows] = await db.execute("SELECT * FROM cursos");
  return rows;
}

export async function getCursosById(id) {
  const [rows] = await db.execute("SELECT * FROM cursos WHERE id = ?", [id]);
  return rows;
}

export async function getCursosByCategory(categoria) {
  const [rows] = await db.execute("SELECT * FROM cursos WHERE categoria = ?", [categoria]);
  return rows;
}

export async function createCurso(
  titulo,
  descripcion,
  contenido,
  categoria
) {
  const [result] = await db.execute(
    "INSERT INTO cursos (titulo, descripcion, contenido, categoria) VALUES (?, ?, ?, ?)",
    [titulo, descripcion, contenido, categoria],
  );
  return { id: result.insertId, titulo, descripcion, contenido, categoria };
}

export async function deleteCursoById(id) {
  const object = await db.execute("delete FROM cursos WHERE id = ?", [id]);
  return object;
}
