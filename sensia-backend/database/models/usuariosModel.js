import { db } from "../db.js";

export async function getUsuarios() {
  const [rows] = await db.execute("SELECT * FROM usuarios");
  return rows;
}

export async function getUsuarioByUsername(username) {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE username = ?", [username]);
    return rows[0];
}

export async function getUsuarioByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows[0];
}

export async function createUsuario(usuarioData) {
  console.log(usuarioData)
  const { nombre, apellido1, apellido2, username, email, password } = usuarioData; // ajusta los campos según tu tabla
  const [result] = await db.execute(
    "INSERT INTO usuarios (nombre, apellido1, apellido2, username, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, apellido1, apellido2, username, email, password],
  );
  return { id: result.insertId, nombre, apellido1, apellido2, email, username, password };
}

export async function deleteUsuarioById(id) {
  const object = await db.execute("delete FROM usuarios WHERE id = ?", [id]);
  return object;
}
