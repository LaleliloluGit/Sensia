import { db } from "../db.js";

export async function getCursos() {
  const [rows] = await db.execute("SELECT * FROM cursos");
  return rows;
}

export async function createCurso(
  titulo,
  descripcion,
) {
  const [result] = await db.execute(
    "INSERT INTO cursos (titulo, descripcion) VALUES (?, ?)",
    [titulo, descripcion],
  );
  return { id: result.insertId, titulo, descripcion };
}

export async function deleteCursoById(id) {
  const object = await db.execute("delete FROM cursos WHERE id = ?", [id]);
  return object;
}
