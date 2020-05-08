import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRespository {
  generated(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
