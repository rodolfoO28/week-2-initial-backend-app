import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppoitmentsController';

const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', appointmentsController.List);
appointmentsRouter.post('/', appointmentsController.Create);

export default appointmentsRouter;
