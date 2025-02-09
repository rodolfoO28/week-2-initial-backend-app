import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmenteService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appoitmentDate = startOfHour(date);

    if (isBefore(appoitmentDate, Date.now()))
      throw new AppError("You can't create an appointment on a past date.");

    if (user_id === provider_id)
      throw new AppError("You can't create an appointment with youself.");

    if (getHours(appoitmentDate) < 8 || getHours(appoitmentDate) > 17)
      throw new AppError(
        'You can only create an appointments between 8am and 5pm.',
      );

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appoitmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appoitmentDate,
    });

    const dateFormmated = format(appoitmentDate, "dd/MM/yyyy 'às' HH'h'mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormmated}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appoitmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmenteService;
