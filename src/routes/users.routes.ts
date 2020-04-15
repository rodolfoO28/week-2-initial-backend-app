import { Router } from 'express';

import multer from 'multer';
import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersController = new UsersController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.Create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersController.UploadAvatar,
);

export default usersRouter;
