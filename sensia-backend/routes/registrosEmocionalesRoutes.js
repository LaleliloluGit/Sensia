import express from "express";

import {
    getRegistrosEmocionalesController,
    getRegistrosEmocionalesCompletoscontroller,
    getRegistrosEmocionalesCompletosByIdcontroller,
    createRegistroEmocionalController,
    deleteRegistroEmocionalController
} from "../controllers/registrosEmocionalesController.js";

const registrosEmocionalesRouter = express.Router();

registrosEmocionalesRouter.get("/todos", getRegistrosEmocionalesController);
registrosEmocionalesRouter.get("/completo", getRegistrosEmocionalesCompletoscontroller);
registrosEmocionalesRouter.get("/completo/:id", getRegistrosEmocionalesCompletosByIdcontroller);
registrosEmocionalesRouter.post("/crear", createRegistroEmocionalController);
registrosEmocionalesRouter.delete("/eliminar/:id", deleteRegistroEmocionalController);


export default registrosEmocionalesRouter;
