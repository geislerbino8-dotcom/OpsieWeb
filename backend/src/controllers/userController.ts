import { Response } from 'express';
import { UserModel } from '../models/userModel';
import { AuthRequest } from '../middleware/authMiddleware';
import bcrypt from 'bcrypt';

export class UserController {
  public getAll = async (req: AuthRequest, res: Response) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  public getAllActive = async (req: AuthRequest, res: Response) => {
    try {
      const users = await UserModel.find({ isActive: true }).select('_id name');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  public updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;

      const { name, currentPassword, password } = req.body;

      if (!name && !password) {
        res.status(400).json({ message: 'Nothing to update' });
        return;
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (name) user.name = name;

      if (password) {
        if (!currentPassword) {
          res.status(400).json({ message: 'Current password is required' });
          return;
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password);

        if (!validPassword) {
          res.status(401).json({mmessage: 'Current password is incorrect' });
          return;
        }

        const samePassword = await bcrypt.compare(password, user.password);

        if (samePassword) {
          res.status(400).json({ message: 'New password must be different from current password' });
          return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      await user.save();

      res.status(200).json({ message: 'Updated successful' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  }
}