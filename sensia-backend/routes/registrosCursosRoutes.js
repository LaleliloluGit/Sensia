import express from "express";

import {
    getRegistrosCursosController,
    getRegistrosCursosByUserIdController,
    createRegistroCursoController,
    deleteRegistroCursoController
} from "../controllers/registrosCursosController.js";

const registrosCursosRouter = express.Router();

registrosCursosRouter.get("/todos", getRegistrosCursosController);
registrosCursosRouter.get("/usuario_id/:id", getRegistrosCursosByUserIdController);
registrosCursosRouter.post("/crear", createRegistroCursoController);
registrosCursosRouter.delete("/eliminar/:id", deleteRegistroCursoController);


export default registrosCursosRouter;
