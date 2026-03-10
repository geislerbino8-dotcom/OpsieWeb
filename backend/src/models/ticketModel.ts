import { model, Schema } from 'mongoose';

const TicketSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: String,
    description: { type: String, required: true},
    platform: { type: String, required: true},
    platformVersion: { type: String, },
    category: {
      type: String,
      enum: [
        'Inquiry',
        'Bug Report',
        'Question',
        'Complaint',
        'Feature Request',
      ],
      required: true,
      default: 'Inquiry',
    },
    status: {
      type: String,
      enum: [
        'open',
        'in progress',
        "won't fix",
        'closed',
        'resolved',
      ],
      default: 'open',
    },
    taskReferenceUrl: { 
      type: String, 
      match: /^https?:\/\//, 
      default: '' 
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const TicketModel = model('Ticket', TicketSchema);