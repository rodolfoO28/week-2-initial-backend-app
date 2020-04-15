import { Request, Response } from 'express';

import UserCreateService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import User from '../models/User';

class UsersController {
  public async Create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { name, email, password } = request.body;

    const userCreate = new UserCreateService();

    const user = await userCreate.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async UploadAvatar(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UsersController;
