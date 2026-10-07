import { model, Schema } from 'mongoose';

const AppointmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    // 'YYYY-MM-DD' — the calendar slot the visitor picked.
    date: { type: Date, required: true },
    // Slot label from the booking bubble (e.g. '10:00 AM'), not an
    // instant in time — so it stays exactly what the visitor saw.
    time: { type: String, required: true },
    // Optional note the visitor attached to the booking — capped at
    // 500 chars; a note must never block an otherwise-valid booking.
    message: { type: String, trim: true, maxlength: 500, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const AppointmentModel = model('Appointment', AppointmentSchema);
