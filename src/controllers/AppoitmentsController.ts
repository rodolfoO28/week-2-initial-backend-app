import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

class AppointmentsController {
  public async List(
    request: Request,
    response: Response,
  ): Promise<Response<Appointment[]>> {
    const repository = getCustomRepository(AppointmentsRepository);
    const appointments = await repository.find();

    return response.json(appointments);
  }

  public async Create(
    request: Request,
    response: Response,
  ): Promise<Response<Appointment>> {
    try {
      const { provider, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        provider,
        date: parsedDate,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AppointmentsController;
