import express from "express";

import {
    getNivelesAlexithimiaController,
    getNivelAlexithimiaByPuntuacionController,
    createNivelAlexithimiaController,
    deleteNivelAlexithimiaController
} from "../controllers/nivelesAlexithimiaController.js";



const nivelesAlexithimiaRouter = express.Router();

nivelesAlexithimiaRouter.get("/todos", getNivelesAlexithimiaController);
nivelesAlexithimiaRouter.get("/puntuacion/:puntuacion", getNivelAlexithimiaByPuntuacionController);
nivelesAlexithimiaRouter.post("/crear", createNivelAlexithimiaController);
nivelesAlexithimiaRouter.delete("/eliminar/:id", deleteNivelAlexithimiaController);


export default nivelesAlexithimiaRouter;
