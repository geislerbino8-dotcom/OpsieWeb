import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true},
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: [
        'admin', 
        'developer',
        'support'
      ],
      default: 'support'
    },
    isActive: { type: Boolean, default: true },
    permissions: [
      { type: String }
    ],
    tickets: [
      { type: Schema.Types.ObjectId, 
        ref: 'Ticket'
      }
    ],
  },
  { timestamps: true }
);

export const UserModel = model('User', UserSchema);