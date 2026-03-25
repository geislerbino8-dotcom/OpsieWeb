/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { TicketModel } from '../models/ticketModel';
import { TicketHistoryModel } from '../models/ticketHistoryModel';
import { UserModel } from '../models/userModel';
import {
  sendTicketCreatedEmail,
  sendTicketUpdatedEmail,
  sendTicketClosedEmail 
} from '../services/emailService';

export class TicketController {

  public create = async(req: Request, res: Response) => {
    
    try {
      const ticket = await TicketModel.create(req.body);

      await TicketHistoryModel.create({
        ticket: ticket._id,
        action: 'created'
      });

      sendTicketCreatedEmail(ticket).catch(console.error);

      res.status(201).json({ message: 'Ticket created succesfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create ticket' });
    }
  };

  public getAll = async(req: Request, res: Response) => {
    try {
      const tickets = await TicketModel.find();

      const formattedTickets = tickets.map((ticket) => ({
        _id: ticket._id,
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        address: ticket.address,
        description: ticket.description,
        platform: ticket.platform,
        platformVersion: ticket.platformVersion,
        category: ticket.category,
        status: ticket.status,
        taskReferenceUrl: ticket.taskReferenceUrl,
        assignee: ticket.assignee
          ? {
              _id: (ticket.assignee as any)._id,
              name: (ticket.assignee as any).name
            }
          : null,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
      }));

      res.json(formattedTickets);
    } catch (error) {
      res.status(400).json({ message: 'Failed to fetch tickets' });
    }
  };

  public async timeline(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const history = await TicketHistoryModel
        .find({ ticket: id })
        .populate('user', 'name')
        .sort({ createdAt: 1 });

      const grouped: any[] = [];

      for (const item of history) {

        const userName = item.user
          ? (item.user as any).name
          : 'System';

        const lastGroup = grouped[grouped.length - 1];

        const sameAction =
          lastGroup &&
          lastGroup.user === userName &&
          lastGroup.action === item.action &&
          Math.abs(
            new Date(lastGroup.time).getTime() -
            new Date(item.createdAt).getTime()
          ) < 2000;

        if (sameAction) {
          lastGroup.changes.push({
            field: item.field,
            oldValue: item.oldValue,
            newValue: item.newValue
          });
        } else {
          grouped.push({
            user: userName,
            action: item.action,
            time: item.createdAt,
            changes: item.action === 'created'
              ? []
              : [{
                  field: item.field,
                  oldValue: item.oldValue,
                  newValue: item.newValue
                }]
          });
        }
      }

      const timeline = grouped.map(group => {
        if (group.action === 'created') {
          return {
            event: `${group.user} created the ticket`,
            time: group.time,
            changes: []
          };
        }

        return {
          event: `${group.user} updated the ticket`,
          time: group.time,
          changes: group.changes
        };
      });

      res.status(200).json(timeline);

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch timeline' });
    }
  }

  public async updateTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { status, category, taskReferenceUrl, assignee } = req.body;

      const ticket = await TicketModel
        .findById(id)
        .populate('assignee', 'name');

      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }

      const updatedFields: any = {};
      const changeMessages: string[] = [];
      let hasChanges = false;

      if (status !== undefined && status !== ticket.status) {
        updatedFields.status = status;
        changeMessages.push(`Status changed from '${ticket.status}' to '${status}'`);
        hasChanges = true;
      }

      if (category !== undefined && category !== ticket.category) {
        updatedFields.category = category;
        changeMessages.push(`Category changed from '${ticket.category}' to '${category}'`);
        hasChanges = true;
      }

      if (taskReferenceUrl !== undefined && taskReferenceUrl !== ticket.taskReferenceUrl) {
        updatedFields.taskReferenceUrl = taskReferenceUrl;
        hasChanges = true;
      }

      if (assignee !== undefined) {
        const newAssignee =
          assignee === '' || assignee === null ? null : assignee;

        const currentAssignee = ticket.assignee
          ? ticket.assignee
          : null;

        if (newAssignee !== currentAssignee?._id.toString()) {
          const user = await UserModel.findById(newAssignee);

          if (user?.role === 'admin') {
            res.status(400).json({ message: 'Tickets cannot be assigned to admins' });
            return;
          }

          updatedFields.assignee = newAssignee ? newAssignee : null;

          if (newAssignee) {
            changeMessages.push(`Ticket assigned to our ${user?.role}`);
          }
          
          hasChanges = true;
        }
      }

      if (!hasChanges) {
        res.status(200).json({ message: 'No changes detected' });
        return;
      }

      const updates: any = {
        ...(status !== undefined && { status }),
        ...(category !== undefined && { category }),
        ...(taskReferenceUrl !== undefined && { taskReferenceUrl }),
        ...(assignee !== undefined && { assignee: assignee || null })
      };

      for (const field in updates) {
        let oldValue: any = (ticket as any)[field];
        let newValue: any = updates[field];

        if (field === 'assignee') {
          const oldName = ticket.assignee
            ? (ticket.assignee as any).name
            : 'Unassigned';

          let newName = 'Unassigned';

          if (newValue) {
            const user = await UserModel.findById(newValue);
            if (user) newName = user.name;
          }

          oldValue = oldName;
          newValue = newName;
        }

        if (oldValue != newValue) {
          await TicketHistoryModel.create({
            // @ts-expect-error - Type mismatch due to population
            ticket: id,
            action: 'updated',
            field,
            oldValue: oldValue || 'none',
            newValue: newValue || 'none',
            user: (req as any).user?.id
          });
        }
      }

      const updatedTicket = await TicketModel.findByIdAndUpdate(
        id, 
        updates,
        { returnDocument: 'after' }
      );

      if (ticket.assignee?._id.toString() && ticket.assignee?._id.toString() !== assignee) {
        await UserModel.findByIdAndUpdate(ticket.assignee?._id.toString(), {
          $pull: { tickets: id }
        });
      }

      if (assignee && ticket.assignee?._id.toString() !== assignee) {
        await UserModel.findByIdAndUpdate(assignee, {
          $addToSet: { tickets: id }
        });
      }

      if (updates.status === 'closed') {
        sendTicketClosedEmail(updatedTicket);
      } else {
        sendTicketUpdatedEmail(updatedTicket, changeMessages);
      }

      res.status(200).json({ message: 'Ticket updated successfully'});
    } catch (error) {
      res.status(400).json({ message: 'Failed to update ticket' });
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const deleted = await TicketModel.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: 'Ticket not found' });
      }

      res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete ticket' });
    }
  };
}