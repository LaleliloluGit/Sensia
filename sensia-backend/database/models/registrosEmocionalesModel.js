import { db } from "../db.js";

export async function getRegistrosEmocionales() {
  const [rows] = await db.execute("SELECT * FROM registros_emocionales");
  return rows;
}

export async function createRegistroEmocional(
  usuario_id,
  emocion_id,
  parte_cuerpo_id,
  descripcion_situacion,
  fecha_hora,
  intensidad,
) {
  const [result] = await db.execute(
    "INSERT INTO registros_emocionales (usuario_id, emocion_id, parte_cuerpo_id, descripcion_situacion, fecha_hora, intensidad) VALUES (?, ?, ?, ?, ?, ?)",
    [usuario_id, emocion_id, parte_cuerpo_id, descripcion_situacion, fecha_hora, intensidad],
  );
  return { id: result.insertId, usuario_id, emocion_id, parte_cuerpo_id, descripcion_situacion, fecha_hora, intensidad };
}

export async function deleteRegistroEmocionalById(id) {
  const object = await db.execute("delete FROM registros_emocionales WHERE id = ?", [id]);
  return object;
}
