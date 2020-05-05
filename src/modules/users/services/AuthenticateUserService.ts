import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import configAuth from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthtenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMacthed = await compare(password, user.password);
    if (!passwordMacthed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = configAuth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthtenticateUserService;
