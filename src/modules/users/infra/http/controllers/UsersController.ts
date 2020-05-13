import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UserCreateService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userCreate = container.resolve(UserCreateService);

    const user = await userCreate.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}

export default UsersController;
