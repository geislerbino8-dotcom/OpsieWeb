import { useEffect, useState } from 'react';
import TicketTimeline from './TicketTimeline';

// --- Types ---
type Ticket = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  platform: string;
  product: string;
  category: 'Inquiry' | 'Bug Report' | 'Question' | 'Complaint' | 'Feature Request';
  status: 'open' | 'in progress' | 'resolved' | "won't fix" | 'closed';
  taskReferenceUrl: string;
  assignee: { _id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
};

type User = { _id: string; name: string };

type Props = {
  ticket: Ticket;
  activeUsers: User[];
  editStatus: Ticket['status'];
  editCategory: Ticket['category'];
  editTaskUrl: string;
  editAssignee: string | null;
  editResolution?: string;
  setEditStatus: (v: Ticket['status']) => void;
  setEditCategory: (v: Ticket['category']) => void;
  setEditTaskUrl: (v: string) => void;
  setEditAssignee: (v: string | null) => void;
  setEditResolution: React.Dispatch<React.SetStateAction<string | undefined>>;
  onClose: () => void;
  onDelete: () => void;
  onSave: () => void;
  statusColors: Record<string, string>;
  categoryColors: Record<string, string>;
};

const TicketModal = ({
  ticket,
  activeUsers,
  editStatus,
  editCategory,
  editTaskUrl,
  editAssignee,
  editResolution,
  setEditStatus,
  setEditCategory,
  setEditTaskUrl,
  setEditAssignee,
  setEditResolution,
  onClose,
  onDelete,
  onSave,
  statusColors,
  categoryColors
}: Props) => {
  const [showResolution, setShowResolution] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Handle resolution field visibility
  useEffect(() => {
    if (ticket.status !== editStatus) {
      setShowResolution(true);
    } else {
      setShowResolution(false);
    }
  }, [editStatus, ticket.status]);

  return (
    <div className='fixed inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all'>
      <div 
        role="dialog"
        aria-modal="true"
        className='bg-white dark:bg-slate-900 rounded-xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transition-colors'
      >
        {/* HEADER */}
        <div className='px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-900/50 rounded-t-xl'>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className='text-xl font-bold text-slate-900 dark:text-white leading-tight'>
                {ticket.name}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border dark:border-transparent ${statusColors[editStatus] || 'bg-gray-100 text-gray-600'}`}>
                {editStatus}
              </span>
            </div>
            <p className='text-sm text-slate-500 dark:text-slate-400 font-mono'>
              ID: {ticket._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className='p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white'
            aria-label="Close modal"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className='flex-1 overflow-y-auto'>
          <div className='grid lg:grid-cols-3 gap-0'>
            
            {/* LEFT COLUMN: Main Details & Timeline */}
            <div className='lg:col-span-2 p-8 border-r border-slate-100 dark:border-slate-800 space-y-8'>
              <section>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Issue Description
                </h3>
                <div className='bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-5 text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap shadow-sm'>
                  {ticket.description || "No description provided."}
                </div>
              </section>

              <section className="pt-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-6">Activity Timeline</h3>
                <TicketTimeline ticketId={ticket._id} />
              </section>
            </div>

            {/* RIGHT COLUMN: Sidebar Metadata */}
            <div className='bg-slate-50/50 dark:bg-slate-900/30 p-8 space-y-6'>
              
              {/* Management Inputs */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Management</h3>
                
                <div>
                  <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>Assignee</label>
                  <select
                    value={editAssignee || ''}
                    onChange={(e) => setEditAssignee(e.target.value || null)}
                    className='w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                  >
                    <option value=''>Unassigned</option>
                    {activeUsers.map((user) => (
                      <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as Ticket['category'])}
                      className='w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
                    >
                      {Object.keys(categoryColors).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as Ticket['status'])}
                      className='w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
                    >
                      {Object.keys(statusColors).map((stat) => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>External Task URL</label>
                  <input
                    value={editTaskUrl}
                    onChange={(e) => setEditTaskUrl(e.target.value)}
                    className='w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none'
                    placeholder='Link to Jira/GitHub...'
                  />
                </div>

                {showResolution && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>Resolution Details</label>
                    <textarea
                      required
                      value={editResolution}
                      onChange={(e) => setEditResolution(e.target.value)}
                      className='w-full h-32 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none resize-none'
                      placeholder='Describe the steps taken to resolve this ticket...'
                    />
                  </div>
                )}
              </div>

              <hr className="border-slate-200 dark:border-slate-800" />

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Customer Details</h3>
                <div className="space-y-3">
                  <DetailItem label="Email" value={ticket.email} />
                  <DetailItem label="Phone" value={ticket.phone} />
                  <DetailItem label="Platform" value={ticket.platform} />
                  <DetailItem label="Product" value={ticket.product} />
                  <DetailItem label="Last Update" value={new Date(ticket.updatedAt).toLocaleDateString()} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className='px-8 py-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-xl'>
          <button
            onClick={onDelete}
            className='text-sm font-semibold text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-md transition-colors'
          >
            Archive Ticket
          </button>

          <div className='flex gap-3 w-full sm:w-auto'>
            <button
              onClick={() => {
                setShowResolution(false);
                onClose();
              }}
              className='flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowResolution(false);
                onSave();
              }}
              className='flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md shadow-blue-200 dark:shadow-none transition-all active:scale-95'
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component updated for dark mode
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="group">
    <p className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase'>{label}</p>
    <p className='text-sm text-slate-800 dark:text-slate-200 break-words'>{value || '—'}</p>
  </div>
);

export default TicketModal;