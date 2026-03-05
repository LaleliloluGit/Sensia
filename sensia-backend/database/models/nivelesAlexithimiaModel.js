import { db } from "../db.js";

export async function getNivelesAlexithimia() {
  const [rows] = await db.execute("SELECT * FROM niveles_alexithimia");
  return rows;
}

export async function createNivelAlexithimia(
  nivel,
  descripcion,
  rango_minimo,
  rango_maximo,
) {
  const [result] = await db.execute(
    "INSERT INTO niveles_alexithimia (nivel, descripcion, rango_minimo, rango_maximo) VALUES (?, ?, ?, ?)",
    [nivel, descripcion, rango_minimo, rango_maximo],
  );
  return {
    id: result.insertId,
    nivel,
    descripcion,
    rango_minimo,
    rango_maximo,
  };
}

export async function deleteNivelAlexithimiaById(id) {
  const object = await db.execute(
    "delete FROM niveles_alexithimia WHERE id = ?",
    [id],
  );
  return object;
}
