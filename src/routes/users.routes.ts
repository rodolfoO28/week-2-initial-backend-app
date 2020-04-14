import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const appointmentsRouter = Router();

appointmentsRouter.post('/', usersController.Create);

export default appointmentsRouter;
