import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const appointmentsRouter = Router();
const sessionsController = new SessionsController();

appointmentsRouter.post('/', sessionsController.create);

export default appointmentsRouter;
