import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();

const appointmentsRouter = Router();

appointmentsRouter.post('/', sessionsController.Create);

export default appointmentsRouter;
