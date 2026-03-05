import express from 'express';
import cors from 'cors';
import usuariosRoutes from './usuariosRoutes.js';
import cursosRoutes from './cursosRoutes.js';
import partesCuerpoRoutes from './partesCuerpoRoutes.js';
import emocionesRoutes from './emocionesRoutes.js';
import nivelesAlexithimiaRoutes from './nivelesAlexithimiaRoutes.js';
import registrosEmocionalesRoutes from './registrosEmocionalesRoutes.js';
import registrosTestRoutes from './registrosTestRoutes.js';
import registrosCursosRoutes from './registrosCursosRoutes.js';

const apiRouter = express.Router();
apiRouter.use(cors())

apiRouter.use('/usuarios', usuariosRoutes);
apiRouter.use('/cursos', cursosRoutes);
apiRouter.use('/partes_cuerpo', partesCuerpoRoutes);
apiRouter.use('/emociones', emocionesRoutes);
apiRouter.use('/niveles_alexithimia', nivelesAlexithimiaRoutes);
apiRouter.use('/registros_emocionales', registrosEmocionalesRoutes);
apiRouter.use('/registros_test', registrosTestRoutes);
apiRouter.use('/registros_cursos', registrosCursosRoutes);

export default apiRouter;
