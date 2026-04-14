import express from "express";

import {
    getRegistrosTestsController,
    createRegistroTestController,
    deleteRegistroTestController
} from "../controllers/registrosTestController.js";

const registrosTestsRouter = express.Router();

registrosTestsRouter.get("/todos", getRegistrosTestsController);
registrosTestsRouter.post("/crear", createRegistroTestController);
registrosTestsRouter.delete("/eliminar/:id", deleteRegistroTestController);


export default registrosTestsRouter;
