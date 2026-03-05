import { db } from "../db.js";

export async function getRegistrosTests() {
  const [rows] = await db.execute("SELECT * FROM registros_test");
  return rows;
}

export async function createRegistroTest(
  usuario_id,
  respuestas,
  puntuacion_total,
  niveles_alexithimia,
  fecha_hora,
) {
  const [result] = await db.execute(
    "INSERT INTO registros_test (usuario_id, respuestas, puntuacion_total, niveles_alexithimia, fecha_hora) VALUES (?, ?, ?, ?, ?)",
    [usuario_id, respuestas, puntuacion_total, niveles_alexithimia, fecha_hora],
  );
  return { id: result.insertId, usuario_id, respuestas, puntuacion_total, niveles_alexithimia, fecha_hora };
}

export async function deleteRegistroTestById(id) {
  const object = await db.execute("delete FROM registros_test WHERE id = ?", [id]);
  return object;
}
