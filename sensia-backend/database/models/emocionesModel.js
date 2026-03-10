import { db } from "../db.js";

export async function getEmociones() {
  const [rows] = await db.execute("SELECT * FROM emociones");
  return rows;
}


export async function getEmocionesPrincipales() {
    const [rows] = await db.execute(
        "SELECT * FROM emociones WHERE emocion_sup IS NULL"
    );
    return rows;
}

export async function getEmocionesByEmocionSup(emocion_sup) {
    const [rows] = await db.execute(
        "SELECT * FROM emociones WHERE emocion_sup = ?",
        [emocion_sup]
    );
    return rows;
}

export async function createEmocion(
  nombre,
  definicion,
  situaciones,
  sintomas,
  pensamientos,
  expresiones,
  necesidades,
  grado,
  emocion_sup,
) {
  const [result] = await db.execute(
    "INSERT INTO emociones (nombre, definicion, situaciones, sintomas, funciones, pensamientos, expresiones, necesidades, grado, emocion_sup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [nombre, definicion, situaciones, sintomas, funciones, pensamientos, expresiones, necesidades, grado, emocion_sup],
  );
  return { id: result.insertId, nombre };
}

export async function deleteEmocionById(id) {
  const object = await db.execute("delete FROM emociones WHERE id = ?", [id]);
  return object;
}
