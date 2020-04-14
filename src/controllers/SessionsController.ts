import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

import User from '../models/User';

interface Sessions {
  user: User;
}

class SessionsController {
  public async Create(
    request: Request,
    response: Response,
  ): Promise<Response<Sessions>> {
    try {
      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserService();

      const { user } = await authenticateUser.execute({
        email,
        password,
      });

      delete user.password;

      return response.json({ user });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default SessionsController;
