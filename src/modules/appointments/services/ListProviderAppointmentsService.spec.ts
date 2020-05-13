import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmets: ListProviderAppointmentsService;

describe('ListProviderAppointmets', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmets = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmets.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });

  it('should be able to list the appointments on a specific day in cache', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await listProviderAppointmets.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    const appointments = await listProviderAppointmets.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([
        {
          date: appointment1.date.toISOString(),
          id: appointment1.id,
          provider_id: appointment1.provider_id,
          user_id: appointment1.user_id,
        },
        {
          date: appointment2.date.toISOString(),
          id: appointment2.id,
          provider_id: appointment2.provider_id,
          user_id: appointment2.user_id,
        },
      ]),
    );
  });
});
