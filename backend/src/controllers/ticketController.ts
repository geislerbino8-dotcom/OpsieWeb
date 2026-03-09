import { Request, Response } from 'express';
import { TicketModel } from '../models/ticketModel';

export class TicketController {

  public create = async(req: Request, res: Response) => {
    
    try {
      await TicketModel.create(req.body);
      
      res.status(201).json({ message: 'Ticket created succesfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create ticket' });
    }
  }

  public getAll = async(req: Request, res: Response) => {
    try {
      const tickets = await TicketModel.find().populate('assignee', 'name');

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
<<<<<<< HEAD
      console.log(error)
      res.status(500).json({ message: 'Failed to fetch tickets' });
=======
      res.status(400).json({ message: 'Failed to fetch tickets' });
>>>>>>> 0b26a989b8a0d4458598063d5f3dfdb3f0d6eadb
    }
  }

  public async updateTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, category, taskReferenceUrl, assignee } = req.body;

      const updateFields: any = {};

      if (status !== undefined) {
        updateFields.status = status;
      }

      if (category !== undefined) {
        updateFields.category = category;
      }

      if (taskReferenceUrl !== undefined) {
        updateFields.taskReferenceUrl = taskReferenceUrl;
      }

      if (assignee !== undefined) {
        updateFields.assignee = assignee === '' || assignee === null ? null : assignee;
      }

      const updatedTicket = await TicketModel.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { returnDocument: 'after' }
      ).populate('assignee', 'name');

      if (!updatedTicket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }

      res.status(200).json({ message: 'Ticket updated successfully' });
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
  }
}