import { db } from "../db.js";

export async function getPartesCuerpo() {
  const [rows] = await db.execute("SELECT * FROM partes_cuerpo");
  return rows;
}

export async function createPartesCuerpo(

  nombre,
  descripcion,
) {
  const [result] = await db.execute(
    "INSERT INTO partes_cuerpo (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion],
  );
  return { id: result.insertId, nombre, descripcion };
}

export async function deletePartesCuerpoById(id) {
  const object = await db.execute("delete FROM partes_cuerpo WHERE id = ?", [id]);
  return object;
}
