import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appoitmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmenteService;
