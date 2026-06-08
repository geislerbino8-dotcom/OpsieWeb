import { useEffect, useState, useRef } from 'react';
import TicketTimeline from './TicketTimeline';
import { supabase } from '../../../utils/supabase.ts';

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
type ResolutionType = 'text' | 'image' | 'file';

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
  editAssignee,
  editResolution,
  setEditStatus,
  setEditCategory,
  setEditAssignee,
  setEditResolution,
  onClose,
  onDelete,
  onSave,
  statusColors,
  categoryColors
}: Props) => {
  const [showResolution, setShowResolution] = useState(false);
  const [resoType, setResoType] = useState<ResolutionType>('text');
  const [isUploading, setIsUploading] = useState(false);
  const [resoPreview, setResoPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    setShowResolution(ticket.status !== editStatus);
  }, [editStatus, ticket.status]);

  const uploadFile = async (fileToUpload: File): Promise<string | null> => {
    setIsUploading(true);
    const fileName = `${Date.now()}-${fileToUpload.name.replace(/\s+/g, '-')}`;

    try {
      const { error } = await supabase.storage
        .from('Opsie Tickets/ticketHistory')
        .upload(fileName, fileToUpload);

      console.log(error)

      if (error) throw error;

      const { data: urlData } = await supabase.storage
        .from('Opsie Tickets/ticketHistory')
        .getPublicUrl(fileName);


      setEditResolution(urlData.publicUrl);
      return urlData.publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Please try again.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (resoType === 'image' && selectedFile.type.startsWith('image/')) {
      setResoPreview(URL.createObjectURL(selectedFile));
    } else {
      setResoPreview(null);
    }

    setFile(selectedFile);
  };

  const handleSave = async () => {
    if (resoType !== 'text' && file) {
      const uploadedUrl = await uploadFile(file);
      if (!uploadedUrl) return; 
    }
    
      onSave();
      setShowResolution(false);
   
  };

  const clearFile = () => {
    setFile(null);
    setResoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className='fixed inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all'>
      <div className='bg-white dark:bg-slate-900 rounded-xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden'>
        
        {/* HEADER */}
        <div className='px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-900/50'>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className='text-xl font-bold text-slate-900 dark:text-white'>{ticket.name}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border dark:border-transparent ${statusColors[editStatus] || 'bg-gray-100'}`}>
                {editStatus}
              </span>
            </div>
            <p className='text-sm text-slate-500 font-mono'>ID: {ticket._id}</p>
          </div>
          <button onClick={onClose} className='text-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white'>×</button>
        </div>

        <div className='flex-1 overflow-y-auto'>
          <div className='grid lg:grid-cols-3 gap-0'>
            
            {/* LEFT COLUMN */}
            <div className='lg:col-span-2 p-8 border-r border-slate-100 dark:border-slate-800 space-y-8'>
              <section>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Issue Description
                </h3>
                <div className='bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-5 text-sm whitespace-pre-wrap dark:text-slate-300'>
                  {ticket.description || "No description provided."}
                </div>
              </section>

              <section className="pt-4">
                <h3 className="text-sm font-semibold mb-6 dark:text-slate-200">Activity Timeline</h3>
                <TicketTimeline ticketId={ticket._id} />
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className='bg-slate-50/50 dark:bg-slate-900/30 p-8 space-y-6'>
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Management</h3>
                
                <div className="grid grid-cols-2 gap-3">
                   <div className="col-span-2">
                    <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>Assignee</label>
                    <select value={editAssignee || ''} onChange={(e) => setEditAssignee(e.target.value || null)} className='w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm dark:text-slate-200'>
                      <option value=''>Unassigned</option>
                      {activeUsers.map((user) => <option key={user._id} value={user._id}>{user.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>Category</label>
                    <select value={editCategory} onChange={(e) => setEditCategory(e.target.value as Ticket['category'])} className='w-full dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm'>
                      {Object.keys(categoryColors).map((cat) => <option className='dark:text-white' key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5'>Status</label>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as Ticket['status'])} className='w-full dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm'>
                      {Object.keys(statusColors).map((stat) => <option key={stat} value={stat}>{stat}</option>)}
                    </select>
                  </div>
                </div>

                {showResolution && (
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 space-y-3">
                    <label className='block text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-tighter'>Resolution Content</label>

                    <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-md">
                      {(['text', 'image', 'file'] as ResolutionType[]).map((t) => (
                        <button key={t} type="button" onClick={() => { setResoType(t); setFile(null); setResoPreview(null); }}
                          className={`flex-1 py-1 text-[10px] font-bold uppercase rounded ${resoType === t ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                          {t}
                        </button>
                      ))}
                    </div>

                    {resoType === 'text' ? (
                      <textarea required value={editResolution} onChange={(e) => setEditResolution(e.target.value)}
                        className='w-full h-24 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm dark:text-white'
                        placeholder='What was the fix?' />
                    ) : (
                      <div className="space-y-2">
                        <input type="file" ref={fileInputRef} className="hidden" accept={resoType === 'image' ? 'image/*' : '*/*'} onChange={handleFileChange} />
                        
                        {!file ? (
                          <button type="button" onClick={() => fileInputRef.current?.click()}
                            className="w-full py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center bg-white dark:bg-slate-800 hover:border-blue-500 transition-all">
                            <span className="text-xs text-slate-500 font-medium">Click to select {resoType}</span>
                          </button>
                        ) : (
                          <div className="relative group p-3 border border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-[10px]">✓</span>
                              </div>
                              <span className="text-xs font-medium text-green-700 dark:text-green-400 truncate">{file.name}</span>
                            </div>
                            <button onClick={clearFile} className="text-xs text-red-500 hover:underline font-bold ml-2">Remove</button>
                          </div>
                        )}
                        
                        {resoPreview && <img src={resoPreview} className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700" alt="Preview" />}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <hr className="border-slate-200 dark:border-slate-800" />

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Details</h3>
                <div className="space-y-3">
                  <DetailItem label="Email" value={ticket.email} />
                  <DetailItem label="Phone" value={ticket.phone} />
                  <DetailItem label="Platform" value={ticket.platform} />
                  <DetailItem label="Product" value={ticket.product} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='px-8 py-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex justify-between items-center gap-4'>
          <button onClick={onDelete} className='text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-md'>
            Archive Ticket
          </button>
          <div className='flex gap-3'>
            <button onClick={onClose} className='px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold dark:text-slate-300'>Cancel</button>
            <button onClick={handleSave} disabled={isUploading}
              className={`px-8 py-2.5 rounded-lg text-white text-sm font-semibold shadow-md transition-all ${isUploading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isUploading ? 'Uploading...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase'>{label}</p>
    <p className='text-sm text-slate-800 dark:text-slate-200 break-words'>{value || '—'}</p>
  </div>
);

export default TicketModal;