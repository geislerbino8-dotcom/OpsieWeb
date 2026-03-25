/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { UserModel } from '../models/userModel';
import { AuthRequest } from '../middleware/authMiddleware';
import bcrypt from 'bcrypt';


export class UserController {
  public getAll = async (req: AuthRequest, res: Response) => {
    try {
      const users = await UserModel.find()
      .select('-password')
      .lean();

      const formattedUsers = users.map((user: any) => ({
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
        tickets: user.tickets ? user.tickets.length : 0,
        createdAt: user.createdAt
      }));

      res.status(200).json({ users: formattedUsers });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };

  public getAllActive = async (req: AuthRequest, res: Response) => {
    try {
      const users = await UserModel.find({ isActive: true }).select('_id name role');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };

  public updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;

      const { name, currentPassword, newPassword } = req.body;

      const user = await UserModel.findById(userId);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (name && name !== user.name) {
        user.name = name;
      }

      if (newPassword) {
        if (!currentPassword) {
          res.status(400).json({ message: 'Current password is required to set a new password' });
          return ;
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
          res.status(400).json({ message: 'Current password is incorrect' });
          return;
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
      }

      await user.save();

      res.status(200).json({ message: 'Update successful' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  };
}
