import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { AuthRequest } from '../middleware/authMiddleware';

export class UserController {
  public getAll = async (req: AuthRequest, res: Response) => {
    try {
      const users = await UserModel.find({}, '_id name');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }
}