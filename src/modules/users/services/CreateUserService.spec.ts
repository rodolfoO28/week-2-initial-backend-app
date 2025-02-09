import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users on the same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
