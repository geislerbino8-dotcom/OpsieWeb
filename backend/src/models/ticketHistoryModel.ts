import { Schema, model } from 'mongoose';

const TicketHistorySchema = new Schema(
  {
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true
    },
    action: {
      type: String,
      required: true
    },
    field: { type: String },
    oldValue: { type: String },
    newValue: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export const TicketHistoryModel = model('TicketHistory', TicketHistorySchema);