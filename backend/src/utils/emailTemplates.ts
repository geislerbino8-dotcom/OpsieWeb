const getStatusBadge = (status: string) => {
  const colors: Record<string, string> = {
    open: '#2563eb',
    'in progress': '#f59e0b',
    resolved: '#10b981',
    closed: '#6b7280',
    'won\'t fix': '#ef4444'
  };

  const color = colors[status] || '#6b7280';

  return `
    <span style='
      background:${color};
      color:white;
      padding:4px 10px;
      border-radius:12px;
      font-size:12px;
      font-weight:bold;
    '>
      ${status}
    </span>
  `;
};

const getCategoryBadge = (category: string) => {
  return `
    <span style='
      background:#e5e7eb;
      color:#374151;
      padding:4px 10px;
      border-radius:12px;
      font-size:12px;
      font-weight:bold;
    '>
      ${category}
    </span>
  `;
};

export const buildEmailTemplate = ( title: string, content: string) => {
  return `
  <div style='font-family:Arial,sans-serif; background:#f4f6f8; padding:30px'>

    <div style='
      max-width:600px;
      margin:auto;
      background:white;
      border-radius:8px;
      overflow:hidden;
      box-shadow:0 3px 8px rgba(0,0,0,0.1)
    '>

      <div style='background:#3cbde6; color:white; text-align: center; padding:20px'>
        <h2 style='margin:0'>${title}</h2>
      </div>

      <div style='padding:24px; color:#333; line-height:1.6'>
        ${content}
      </div>

      <div style='
        border-top:1px solid #e5e7eb;
        padding:20px;
        text-align:center;
        font-size:13px;
        color:#6b7280
      '>
        <p>This is an automated email from the Opsie Software Solutions Inc. Support Ticket System.</p>

        <img
          src='https://i.imageupload.app/81acd6df4240f5a93c10.jpeg'
          alt='Opsie Logo'
          style='margin-top:10px; height:75px'
        />

        <p style='margin-top:10px'>
          Copyright © ${new Date().getFullYear()} Opsie Software Solutions Inc.
        </p>
      </div>

    </div>

  </div>
  `;
};

export const ticketCreatedEmail = (ticket: any) => {
  const body = `
    <p>Hello <b>${ticket.name}</b>,</p>

    <p>A support ticket has been created for your ${ticket.category}.</p>

    <h3>Ticket Details</h3>

    <p><b>Ticket ID:</b> ${ticket._id}</p>

    <p><b>Status:</b> ${getStatusBadge(ticket.status)}</p>

    <p><b>Category:</b> ${getCategoryBadge(ticket.category)}</p>

    <p><b>Description:</b></p>
    <p style='font-style: italic;'>${ticket.description}</p>

    <p style='margin-top: 28px;'>Our support team will review your request shortly.</p>
  `;

  return buildEmailTemplate(
    'Ticket Created',
    body
  );
};

export const ticketUpdatedEmail = (
  ticket: any,
  changes: string[]
) => {

  const changeList = changes
    .map(change => `<li>${change}</li>`)
    .join('');

  const body = `
    <p>Hello <b>${ticket.name}</b>,</p>

    <p>Your support ticket has been updated.</p>

    <h3>Recent Changes</h3>

    <ul>
      ${changeList}
    </ul>

    <h3>Current Ticket Status</h3>

    <p><b>Ticket ID:</b> ${ticket._id}</p>

    <p><b>Status:</b> ${getStatusBadge(ticket.status)}</p>

    <p><b>Category:</b> ${getCategoryBadge(ticket.category)}</p>

    <p style='margin-top: 28px;'>If you have additional details to provide, please contact us right away.</p>
  `;

  return buildEmailTemplate(
    'Ticket Updated',
    body
  );
};

export const ticketClosedEmail = (ticket: any) => {

  const body = `
    <p>Hello <b>${ticket.name}</b>,</p>

    <p>Your support ticket has been marked as <b>Closed</b>.</p>

    <h3>Ticket Summary</h3>

    <p><b>Ticket ID:</b> ${ticket._id}</p>

    <p><b>Category:</b> ${getCategoryBadge(ticket.category)}</p>

    <p><b>Status:</b> ${getStatusBadge(ticket.status)}</p>

    <p><b>Description:</b></p>

    <p style='font-style: italic;'>${ticket.description}</p>

    <p style='margin-top: 28px;'>If you have other inquiries, feel free to contact us again.</p>

    <p>Thank you for contacting support.</p>
  `;

  return buildEmailTemplate(
    'Ticket Closed',
    body
  );
};

export const appointmentBookedEmail = (appointment: any) => {
  // Mongo hands back a Date — rebuild it as a *local* date so the label
  // can never shift a day across UTC boundaries.
  const iso = new Date(appointment.date).toISOString().slice(0, 10);
  const [year, month, day] = iso.split('-').map(Number);
  const dateLabel = new Date(year, month - 1, day).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  // The note is free text typed by the visitor — HTML-escape it before
  // it rides along in the confirmation email.
  const note = appointment.message
    ? String(appointment.message)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    : '';

  const body = `
    <p>Hello <b>${appointment.name}</b>,</p>

    <p>Your consultation appointment has been booked.</p>

    <h3>Appointment Details</h3>

    <p><b>Date:</b> ${dateLabel}</p>

    <p><b>Time:</b> ${appointment.time}</p>

    <p><b>Duration:</b> 30 minutes</p>

    ${note ? `<p><b>Your note:</b> ${note}</p>` : ''}

    <p style='margin-top: 28px;'>Our team will reach out to confirm the schedule. If you need to reschedule, reply to this email or book a new slot on our website.</p>
  `;

  return buildEmailTemplate(
    'Appointment Booked',
    body
  );
};