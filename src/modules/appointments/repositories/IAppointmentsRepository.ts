import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  findAll(): Promise<Appointment[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
