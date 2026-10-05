import axiosClient from './axiosClient';

export interface AppointmentData {
  name: string;
  email: string;
  /** 'YYYY-MM-DD' — the day picked in the booking calendar. */
  date: string;
  /** Slot label, e.g. '10:00 AM'. */
  time: string;
}

export const createAppointment = async (data: AppointmentData) => {
  const response = await axiosClient.post('/appointments/create', data);

  return response.data;
};
