import { model, Schema } from 'mongoose';

const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: String,
    message: { type: String, required: true},
  },
  
  { timestamps: true }
);

export const InquiryModel = model('Inquiry', InquirySchema);