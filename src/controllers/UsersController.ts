import { Request, Response } from 'express';

import UserCreateService from '../services/CreateUserService';

import User from '../models/User';

class UsersController {
  public async Create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    try {
      const { name, email, password } = request.body;

      const userCreate = new UserCreateService();

      const user = await userCreate.execute({
        name,
        email,
        password,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UsersController;
