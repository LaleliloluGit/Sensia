import { db } from "../db.js";

export async function getRegistrosEmocionales() {
  const [rows] = await db.execute("SELECT * FROM registros_emocionales");
  return rows;
}

export async function getRegistrosEmocionalesCompletos() {
  const [rows] = await db.execute(`
    SELECT 
      re.id,
      re.usuario_id,
      re.descripcion_situacion,
      re.fecha_hora,
      re.intensidad,

      e.id AS emocion_id,
      e.nombre AS emocion_nombre,
      e.definicion AS emocion_definicion,
      e.situaciones AS emocion_situaciones,
      e.sintomas AS emocion_sintomas,
      e.pensamientos AS emocion_pensamientos,
      e.expresiones AS emocion_expresiones,
      e.necesidades AS emocion_necesidades,
      e.grado AS emocion_grado,
      e.emocion_sup AS emocion_sup,

      pc.id AS parte_cuerpo_id,
      pc.nombre AS parte_cuerpo_nombre,
      pc.descripcion AS parte_cuerpo_descripcion

    FROM registros_emocionales re
    INNER JOIN emociones e 
      ON re.emocion_id = e.id
    INNER JOIN partes_cuerpo pc 
      ON re.parte_cuerpo_id = pc.id
    ORDER BY re.fecha_hora DESC
  `);

  return rows;
}

export async function getRegistrosEmocionalesCompletosById(id) {
  const [rows] = await db.execute(`
    SELECT 
      re.id,
      re.usuario_id,
      re.descripcion_situacion,
      re.fecha_hora,
      re.intensidad,

      e.id AS emocion_id,
      e.nombre AS emocion_nombre,
      e.definicion AS emocion_definicion,
      e.situaciones AS emocion_situaciones,
      e.sintomas AS emocion_sintomas,
      e.pensamientos AS emocion_pensamientos,
      e.expresiones AS emocion_expresiones,
      e.necesidades AS emocion_necesidades,
      e.grado AS emocion_grado,
      e.emocion_sup AS emocion_sup,

      pc.id AS parte_cuerpo_id,
      pc.nombre AS parte_cuerpo_nombre,
      pc.descripcion AS parte_cuerpo_descripcion

    FROM registros_emocionales re
    INNER JOIN emociones e 
    ON re.emocion_id = e.id
    INNER JOIN partes_cuerpo pc 
    ON re.parte_cuerpo_id = pc.id
    WHERE re.usuario_id = ?
    ORDER BY re.fecha_hora DESC
  `, [id]);

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
