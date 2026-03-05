import { db } from "../db.js";

export async function getUsuarios() {
  const [rows] = await db.execute("SELECT * FROM usuarios");
  return rows;
}

export async function createUsuario(
  nombre,
  apellido1,
  apellido2,
  username,
  email,
  password,
) {
  const apellido2Value = apellido2 || null;
  const [result] = await db.execute(
    "INSERT INTO usuarios (nombre, apellido1, apellido2, username, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, apellido1, apellido2Value, username, email, password],
  );
  return { id: result.insertId, nombre, apellido1, apellido2, email };
}

export async function deleteUsuarioById(id) {
  const object = await db.execute("delete FROM usuarios WHERE id = ?", [id]);
  return object;
}
