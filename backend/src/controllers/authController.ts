import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';
import { TicketModel } from '../models/ticketModel';
import { AuthRequest } from '../middleware/authMiddleware';
import { ROLE_PERMISSIONS } from '../constants/rolePermissions';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthController {

  public me = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;

      const user = await UserModel.findById(userId).select('-password -permissions');

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const { name, username, role } = req.body;

      const existingUser = await UserModel.findOne({ username });

      if (existingUser) return res.status(400).json({ message: 'Username already exists' });

      if (!name || !username || !role) return res.status(400).json({ message: 'Missing fields' });

      if (!ROLE_PERMISSIONS[role]) return res.status(400).json({ message: 'Invalid role' });

      if (role === 'admin') return res.status(403).json({ message: 'Admin accounts cannot be created' });

      const hashedPassword = await bcrypt.hash(username, 10);

      const permissions = ROLE_PERMISSIONS[role];

      await UserModel.create(
        {
          name,
          username,
          password: hashedPassword,
          role,
          permissions
        });

      res.status(201).json({message: 'User created successfully'});
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user' });
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await UserModel.findOne({ username });

      if (!user || !user.isActive) return res.status(401).json({ message: 'Invalid username or password' });

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) return res.status(401).json({ message: 'Invalid username or password' });

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          permissions: user.permissions
        },
        JWT_SECRET,
        { expiresIn: '12h' }
      );

      res.json({message: 'Login successful', token});
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  }

  public async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, role } = req.body;

      const existingUser = await UserModel.findOne({ name });

      if (existingUser) return res.status(400).json({ message: 'Name already taken' });

      if (role === 'admin') {
        res.status(403).json({ message: 'Cannot assign admin role' });
        return;
      }

      if (req.user?.id === id) {
        res.status(403).json({ message: 'You cannot modify your own role' });
        return;
      }

      if (!ROLE_PERMISSIONS[role]) {
        res.status(400).json({ message: 'Invalid role' });
        return;
      }

      const user = await UserModel.findById(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (user.role === 'admin') {
        res.status(403).json({ message: 'Admin users cannot be modified' });
        return;
      }

      user.name = name
      user.role = role;
      user.permissions = ROLE_PERMISSIONS[role];

      await user.save();

      res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user role' });
    }
  }

  public async resetPassword(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserModel.findById(id);

      if (!user) return res.status(404).json({ message: 'User not found' });

      const defaultPassword = user.username;

      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      user.password = hashedPassword;

      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to reset password' });
    }
  }

  public async restoreUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await UserModel.findByIdAndUpdate(id, { isActive: true });

      res.status(200).json({ message: 'User restored successfully' });

    } catch (error) {
      res.status(500).json({ message: 'Failed to restore user' });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserModel.findById(id);

      if (!user) return res.status(404).json({ message: 'User not found' })

      if (user.role === 'admin') return res.status(403).json({ message: 'Cannot delete admin users' });

      await TicketModel.updateMany(
        { assignee: id },
        { $set: { assignee: null } }
      );

      user.isActive = false;

      await user.save();

      res.status(200).json({ message: 'User deleted successfully and tickets unassigned' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }
}