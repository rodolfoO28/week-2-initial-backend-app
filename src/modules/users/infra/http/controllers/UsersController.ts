import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserCreateService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userCreate = container.resolve(UserCreateService);

    const user = await userCreate.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async uploadAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UsersController;
