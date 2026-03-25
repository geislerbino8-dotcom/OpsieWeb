import nodemailer from 'nodemailer';
import {
  ticketCreatedEmail,
  ticketUpdatedEmail,
  ticketClosedEmail
} from '../utils/emailTemplates';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
} as nodemailer.SendMailOptions);

export const sendTicketCreatedEmail = async (ticket: any) => {
  const htmlEmail = ticketCreatedEmail(ticket);

  await transporter.sendMail({
    from: `'Opsie Software Solutions Inc. Support System' <${process.env.EMAIL_USER}>`,
    to: ticket.email,
    subject: `Ticket Created - (#${ticket._id.toString().slice(-8)})`,
    html: htmlEmail
  });
};

export const sendTicketUpdatedEmail = async (ticket: any, changes: string[]) => {
  const htmlEmail = ticketUpdatedEmail(ticket, changes);
  
  await transporter.sendMail({
    from: `'Opsie Software Solutions Inc. Support System' <${process.env.EMAIL_USER}>`,
    to: ticket.email,
    subject: `Ticket Updated - (#${ticket._id.toString().slice(-8)})`,
    html: htmlEmail
  });
};

export const sendTicketClosedEmail = async (ticket: any) => {
  const htmlEmail = ticketClosedEmail(ticket);

  await transporter.sendMail({
    from: `'Opsie Software Solutions Inc. Support System' <${process.env.EMAIL_USER}>`,
    to: ticket.email,
    subject: `Ticket Closed - (#${ticket._id.toString().slice(-8)})`,
    html: htmlEmail
  });
};

/*

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendTicketEmail = async (
  email: string,
  ticketId: string,
  changes: string[],
  isNew = false
) => {
  const subject = isNew
    ? `Your support ticket (#${ticketId.slice(-6)}) was created`
    : `Your support ticket (#${ticketId.slice(-6)}) was updated`;

  const htmlMessage = `
    <div style='font-family: sans-serif; line-height: 1.5; color: #333;'>
      <h2 style='color: #1D4ED8;'>${isNew ? 'New Ticket Created' : 'Ticket Updated'}</h2>
      <p>Ticket ID: <strong>${ticketId}</strong></p>
      ${
        changes.length > 0
          ? `
             <ul>
               ${changes.map(c => `<li>${c}</li>`).join('')}
             </ul>
             `
          : ''
      }
      <p>Thank you for using our support system.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `'Opsie Software Solutions Inc.' <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: htmlMessage,
  });
}
  */