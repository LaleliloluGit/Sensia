import express from "express";

import {
    getCursosController,
    createCursoController,
    deleteCursoController
} from "../controllers/cursosController.js";



const cursosRouter = express.Router();

cursosRouter.get("/todos", getCursosController);
cursosRouter.post("/crear", createCursoController);
cursosRouter.delete("/eliminar/:id", deleteCursoController);


export default cursosRouter;
