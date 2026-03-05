import express from "express";

import {
    getUsuariosController,
    createUsuarioController,
    deleteUsuarioController
} from "../controllers/usuariosController.js";



const usuarioRouter = express.Router();

usuarioRouter.get("/todos", getUsuariosController);
usuarioRouter.post("/crear", createUsuarioController);
usuarioRouter.delete("/eliminar/:id", deleteUsuarioController);


export default usuarioRouter;
