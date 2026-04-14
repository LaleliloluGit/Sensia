import express from "express";

import {
    getCursosController,
    getCursosByIdController,
    getCursosByCategoryController,
    createCursoController,
    deleteCursoController
} from "../controllers/cursosController.js";



const cursosRouter = express.Router();

cursosRouter.get("/todos", getCursosController);
cursosRouter.get("/id/:id", getCursosByIdController);
cursosRouter.get("/categoria/:categoria", getCursosByCategoryController);
cursosRouter.post("/crear", createCursoController);
cursosRouter.delete("/eliminar/:id", deleteCursoController);


export default cursosRouter;
