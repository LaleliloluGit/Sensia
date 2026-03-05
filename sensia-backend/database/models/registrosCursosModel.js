import { db } from "../db.js";

export async function getRegistrosCursos() {
  const [rows] = await db.execute("SELECT * FROM registro_cursos");
  return rows;
}

export async function createRegistroCurso(
  usuario_id,
  curso_id,
) {
  const [result] = await db.execute(
    "INSERT INTO registro_cursos (usuario_id, curso_id) VALUES (?, ?)",
    [usuario_id, curso_id],
  );
  return { id: result.insertId, usuario_id, curso_id };
}

export async function deleteRegistroCursoById(id) {
  const object = await db.execute("delete FROM registro_cursos WHERE id = ?", [id]);
  return object;
}
