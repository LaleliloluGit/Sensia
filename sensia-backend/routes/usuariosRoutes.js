import express from "express";

import {
    getUsuariosController,
    getUsuarioByUsernameController,
    getUsuarioByEmailController,
    loginUsuarioController,
    createUsuarioController,
    deleteUsuarioController
} from "../controllers/usuariosController.js";



const usuarioRouter = express.Router();

usuarioRouter.get("/todos", getUsuariosController);
usuarioRouter.get("/username/:username", getUsuarioByUsernameController);
usuarioRouter.get("/email/:email", getUsuarioByEmailController);
usuarioRouter.post("/login", loginUsuarioController);
usuarioRouter.post("/crear", createUsuarioController);
usuarioRouter.delete("/eliminar/:id", deleteUsuarioController);


export default usuarioRouter;
