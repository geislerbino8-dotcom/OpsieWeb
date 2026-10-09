import { Request, Response } from 'express';
import { AppointmentModel } from '../models/appointmentModel';
import { sendAppointmentBookedEmail } from '../services/emailService';

export class AppointmentController {
  public create = async (req: Request, res: Response) => {
    try {
      const { name, email, date, time, message } = req.body;

      if (!name || !email || !date || !time) {
        res.status(400).json({
          message: 'Name, email, date and time are required',
        });
        return;
      }

      const appointment = await AppointmentModel.create({
        name,
        email,
        date,
        time,
        // Optional by design — anything non-string (or absent) books
        // as "no note" instead of failing the whole request.
        message: typeof message === 'string' ? message : '',
      });

      // The slot is already saved — an email hiccup must not fail the
      // booking (same fire-and-forget pattern as the ticket system).
      sendAppointmentBookedEmail(appointment).catch(console.error);

      res.status(201).json({
        message: 'Appointment booked successfully',
        appointment: {
          _id: appointment._id,
          name: appointment.name,
          email: appointment.email,
          date: appointment.date,
          time: appointment.time,
          message: appointment.message,
          status: appointment.status,
        },
      });
    } catch {
      res.status(400).json({ message: 'Failed to book appointment' });
    }
  };
}
