import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

import User from '../models/User';

interface Sessions {
  user: User;
  token: string;
}

class SessionsController {
  public async Create(
    request: Request,
    response: Response,
  ): Promise<Response<Sessions>> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

export default SessionsController;
