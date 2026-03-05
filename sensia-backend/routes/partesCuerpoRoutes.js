import express from "express";

import {
    getPartesCuerpoController,
    createPartesCuerpoController,
    deletePartesCuerpoController
} from "../controllers/partesCuerpoController.js";



const partesCuerpoRouter = express.Router();

partesCuerpoRouter.get("/todos", getPartesCuerpoController);
partesCuerpoRouter.post("/crear", createPartesCuerpoController);
partesCuerpoRouter.delete("/eliminar/:id", deletePartesCuerpoController);


export default partesCuerpoRouter;
