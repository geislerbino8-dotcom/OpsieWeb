import { Request, Response } from 'express';
import { InquiryModel } from '../models/inquiryModel';

export class InquiryController {

  public create = async(req: Request, res: Response) => {
    try {
      await InquiryModel.create(req.body);
      res.status(201).json({ message: 'Inquiry created succesfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create inquiry' });
    }
  }

  public getAll = async(req: Request, res: Response) => {
    try {
      const inquiries = await InquiryModel.find();

      const formattedInquries = inquiries.map((inq) => ({
        _id: inq._id,
        name: inq.name,
        email: inq.email,
        phone: inq.phone,
        address: inq.address,
        description: inq.description,
        platform: inq.platform,
        platformVersion: inq.platformVersion,
        category: inq.category,
        status: inq.status,
        taskReferenceUrl: inq.taskReferenceUrl,
        assignee: inq.assignee
          ? {
              name: (inq.assignee as any).name,
            }
          : null,
        createdAt: inq.createdAt,
        updatedAt: inq.updatedAt
      }));

      res.json(formattedInquries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch inquiries' });
    }
  }

  public updateStatus = async(req: Request, res: Response) => {
    try {
      await InquiryModel.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { returnDocument: 'after' }
      );

      res.json({ message: `Inquiry ${req.params.id} status changed to ${req.body.status}` });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update status' });
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const deleted = await InquiryModel.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }

      res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete inquiry' });
    }
  };
}