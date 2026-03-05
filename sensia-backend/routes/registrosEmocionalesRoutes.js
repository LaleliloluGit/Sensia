import express from "express";

import {
    getRegistrosEmocionalesController,
    createRegistroEmocionalController,
    deleteRegistroEmocionalController
} from "../controllers/registrosEmocionalesController.js";

const registrosEmocionalesRouter = express.Router();

registrosEmocionalesRouter.get("/todos", getRegistrosEmocionalesController);
registrosEmocionalesRouter.post("/crear", createRegistroEmocionalController);
registrosEmocionalesRouter.delete("/eliminar/:id", deleteRegistroEmocionalController);


export default registrosEmocionalesRouter;
