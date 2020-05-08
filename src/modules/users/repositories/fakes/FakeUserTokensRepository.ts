import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { uuid } from 'uuidv4';
import IUserTokensRespository from '../IUserTokensRepository';

export default class FakeUserTokensRepository
  implements IUserTokensRespository {
  private userTokens: UserToken[] = [];

  public async generated(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findUserToken => findUserToken.token === token,
    );

    return userToken;
  }
}
