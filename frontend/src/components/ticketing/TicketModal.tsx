import { useEffect } from 'react';
import TicketTimeline from './TicketTimeline';

type Ticket = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  platform: string;
  platformVersion?: string;
  category: 'Inquiry' | 'Bug Report' | 'Question' | 'Complaint' | 'Feature Request';
  status: 'open' | 'in progress' | 'resolved' | "won't fix" | 'closed';
  taskReferenceUrl: string;
  assignee: { _id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
};

type User = {
  _id: string;
  name: string;
};

type Props = {
  ticket: Ticket;
  users: User[];
  editStatus: Ticket['status'];
  editCategory: Ticket['category'];
  editTaskUrl: string;
  editAssignee: string | null;
  setEditStatus: (v: Ticket['status']) => void;
  setEditCategory: (v: Ticket['category']) => void;
  setEditTaskUrl: (v: string) => void;
  setEditAssignee: (v: string | null) => void;
  onClose: () => void;
  onDelete: () => void;
  onSave: () => void;
  statusColors: any;
  categoryColors: any;
};

const TicketModal = ({
  ticket,
  users,
  editStatus,
  editCategory,
  editTaskUrl,
  editAssignee,
  setEditStatus,
  setEditCategory,
  setEditTaskUrl,
  setEditAssignee,
  onClose,
  onDelete,
  onSave,
  statusColors,
  categoryColors
}: Props) => {

  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl'>
        <div className='px-6 py-4 border-b flex justify-between items-center'>
          <div>
            <h2 className='text-lg font-semibold text-gray-800'>
              {ticket.name}
            </h2>
            <p className='text-xs text-gray-500'>
              Ticket ID: {ticket._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className='text-gray-500 hover:text-black text-xl cursor-pointer'
          >
            ✕
          </button>
        </div>

        <div className='grid md:grid-cols-3 gap-6 p-6'>
          <div className='md:col-span-2 space-y-6'>
            <div>
              <p className='text-xs text-gray-500 mb-1'>Description</p>
              <div className='border rounded-md p-4 bg-gray-50 whitespace-pre-wrap text-sm'>
                {ticket.description}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-gray-500 text-xs'>Email</p>
                <p>{ticket.email}</p>
              </div>

              <div>
                <p className='text-gray-500 text-xs'>Phone</p>
                <p>{ticket.phone}</p>
              </div>

              <div>
                <p className='text-gray-500 text-xs'>Address</p>
                <p>{ticket.address || '—'}</p>
              </div>

              <div>
                <p className='text-gray-500 text-xs'>Platform</p>
                <p>{ticket.platform || '—'}</p>
              </div>

              <div>
                <p className='text-gray-500 text-xs'>Platform Version</p>
                <p>{ticket.platformVersion || '—'}</p>
              </div>

              <div>
                <p className='text-gray-500 text-xs'>Created</p>
                <p>{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>

              <div>
                <p className='text-gray-500 text-xs'>Updated</p>
                <p>{new Date(ticket.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className='space-y-5'>
            <div>
              <p className='text-xs text-gray-500 mb-1'>Category</p>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as Ticket['category'])}
                className='border rounded-md w-full px-3 py-2 text-sm'
              >
                {Object.keys(categoryColors).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <p className='text-xs text-gray-500 mb-1'>Status</p>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as Ticket['status'])}
                className='border rounded-md w-full px-3 py-2 text-sm'
              >
                {Object.keys(statusColors).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <p className='text-xs text-gray-500 mb-1'>Task Reference</p>
              <input
                value={editTaskUrl}
                onChange={(e) => setEditTaskUrl(e.target.value)}
                className='border rounded-md w-full px-3 py-2 text-sm'
                placeholder='https://github.com/'
              />
            </div>

            <div>
              <p className='text-gray-500 text-xs mb-1'>Assignee</p>

              <select
                value={editAssignee || ''}
                onChange={(e) => setEditAssignee(e.target.value || null)}
                className='border rounded-md px-3 py-2 w-full text-sm'
              >
                <option value=''>Unassigned</option>

                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <TicketTimeline ticketId={ticket._id} />

        <div className='px-6 py-4 border-t bg-gray-50'>
          <div className='flex flex-col sm:flex-row sm:justify-between gap-3'>
            <button
              onClick={onDelete}
              className='w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 cursor-pointer'
            >
              Delete Ticket
            </button>

            <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
              <button
                onClick={onClose}
                className='w-full sm:w-auto px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100 cursor-pointer'
              >
                Cancel
              </button>

              <button
                onClick={onSave}
                className='w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;