import express from "express";

import {
    getRegistrosCursosController,
    createRegistroCursoController,
    deleteRegistroCursoController
} from "../controllers/registrosCursosController.js";

const registrosCursosRouter = express.Router();

registrosCursosRouter.get("/todos", getRegistrosCursosController);
registrosCursosRouter.post("/crear", createRegistroCursoController);
registrosCursosRouter.delete("/eliminar/:id", deleteRegistroCursoController);


export default registrosCursosRouter;
