import express from "express";

import {
    getRegistrosTestsController,
    getRegistrosTestsByUserIdController,
    createRegistroTestController,
    deleteRegistroTestController
} from "../controllers/registrosTestController.js";

const registrosTestsRouter = express.Router();

registrosTestsRouter.get("/todos", getRegistrosTestsController);
registrosTestsRouter.get("/usuario/:id", getRegistrosTestsByUserIdController);
registrosTestsRouter.post("/crear", createRegistroTestController);
registrosTestsRouter.delete("/eliminar/:id", deleteRegistroTestController);


export default registrosTestsRouter;
