import express from "express";

import {
    getEmocionesController,
    getEmocionesPrincipalesController,
    getEmocionesByEmocionSupController,
    createEmocionController,
    deleteEmocionController
} from "../controllers/emocionesController.js";



const emocionesRouter = express.Router();

emocionesRouter.get("/todos", getEmocionesController);
emocionesRouter.get("/emocion_sup/:emocion_sup", getEmocionesByEmocionSupController);
emocionesRouter.get("/principales", getEmocionesPrincipalesController);
emocionesRouter.post("/crear", createEmocionController);
emocionesRouter.delete("/eliminar/:id", deleteEmocionController);


export default emocionesRouter;
