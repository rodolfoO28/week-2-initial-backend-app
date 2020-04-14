import { Router } from 'express';

import AppointmentsController from '../controllers/AppoitmentsController';

const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();

appointmentsRouter.get('/', appointmentsController.List);
appointmentsRouter.post('/', appointmentsController.Create);

export default appointmentsRouter;
