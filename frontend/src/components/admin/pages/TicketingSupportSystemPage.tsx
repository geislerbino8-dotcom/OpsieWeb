import { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Box, 
  RotateCcw 
} from 'lucide-react'; // Suggested icons for better UX

import { getTickets } from '../../../api/getTickets';
import { deleteTicket } from '../../../api/deleteTicket';
import { updateTicket } from '../../../api/updateTicket';
import { getActiveUsers } from '../../../api/getActiveUsers';
import { useApiState } from '../../../hooks/useApiState';
import { useToast } from '../../../hooks/useToast';
import { useConfirm } from '../context/ConfirmContext';

import TicketModal from '../ticketing/TicketModal';
import LoadingOverlay from '../common/LoadingOverlay';
import ToastContainer from '../common/ToastComponent';

import { products } from '@/data/productsData';

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
  assignee: {
    _id: string,
    name: string
    
    role: string
  } | null;
  createdAt: string;
  updatedAt: string;
};

type User = {
  _id: string;
  name: string;
  role: string;
};

const statusColors = {
  open: 'bg-blue-50 text-blue-700',
  'in progress': 'bg-yellow-50 text-yellow-700',
  resolved: 'bg-green-50 text-green-700',
  "won't fix": 'bg-red-50 text-red-700',
  closed: 'bg-gray-100 text-gray-600',
};

const categoryColors = {
  Inquiry: 'bg-indigo-600 text-white',
  'Bug Report': 'bg-rose-600 text-white',
  Question: 'bg-lime-600 text-white',
  Complaint: 'bg-amber-600 text-white',
  'Feature Request': 'bg-emerald-600 text-white'
};

const TicketingSupportSystemPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'email' | 'platform' | 'assignee' | 'createdAt' | 'updatedAt'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const [editStatus, setEditStatus] = useState<Ticket['status']>('open');
  const [editCategory, setEditCategory] = useState<Ticket['category']>('Inquiry');
  const [editTaskUrl, setEditTaskUrl] = useState('');
  const [editAssignee, setEditAssignee] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [ editResolution, setEditResolution ] = useState<string>()

  const apiState = useApiState();
  const { toasts, addToast } = useToast();
  const confirm = useConfirm();


  useEffect(() => {
    fetchTickets();
    fetchActiveUsers();
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      setEditStatus(selectedTicket.status);
      setEditCategory(selectedTicket.category);
      setEditTaskUrl(selectedTicket.taskReferenceUrl || '');
      setEditAssignee(selectedTicket.assignee?._id || null)
    }
  }, [selectedTicket]);

  const fetchTickets = async () => {
    try {
      apiState.startLoading();
      const data = await getTickets();
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setTickets(data);
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to load tickets', 'error');
    } finally {
      apiState.reset();
    }
  };

  const fetchActiveUsers = async () => {
    try {
      apiState.startLoading();
      const data = await getActiveUsers();
      setActiveUsers(data);
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to fetch users', 'error');
    } finally {
      apiState.reset();
    }
  };

  const handleUpdate = async () => {
    if (!selectedTicket) return;
    try {
      const ok = await confirm({
        title: 'Update Ticket',
        message: 'Are you sure you want to update this ticket?',
        confirmText: 'UPDATE'
      });
      if(!ok) return;
      apiState.startLoading();
      const data = await updateTicket(selectedTicket._id, {
        status: editStatus,
        category: editCategory,
        taskReferenceUrl: editTaskUrl,
        assignee: editAssignee,
        resolution: editResolution 
      });
      addToast(data.message, 'success');
      const user = activeUsers.find(user => user._id === editAssignee);
      setTickets(prev =>
        prev.map(ticket =>
          ticket._id === selectedTicket._id
            ? { ...ticket, status: editStatus, category: editCategory, taskReferenceUrl: editTaskUrl, assignee: user ? { _id: user._id, name: user.name, role: user.role } : null }
            : ticket
        )
      );

      fetchTickets();
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to update ticket', 'error');
    } finally {
      apiState.reset();
    }
    setSelectedTicket(null);
  };

  const handleDelete = async () => {
    if (!selectedTicket) return;
    try {
      const ok = await confirm({
        title: 'Delete Ticket',
        message: 'Are you sure you want to delete this ticket?',
        confirmText: 'DELETE'
      });
      if(!ok) return;
      apiState.startLoading();
      await deleteTicket(selectedTicket._id);
      addToast('Ticket deleted', 'success');
      fetchTickets();
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Delete failed', 'error');
    } finally {
      apiState.reset();
    }
    setTickets(prev => prev.filter(t => t._id !== selectedTicket._id));
    setSelectedTicket(null);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setProductFilter('all');
  };

  // Sorting and Filtering Logic
  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderHeader = (label: string, field: typeof sortField) => (
    <th
      onClick={() => handleSort(field)}
      className='px-4 py-3 cursor-pointer select-none hover:bg-gray-50 font-semibold text-slate-700 transition-colors'
    >
      <div className='flex items-center gap-2'>
        <span>{label}</span>
        <span className='text-[10px] text-gray-400'>
          {sortField === field ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </div>
    </th>
  );

  let filteredTickets = [...tickets];
  if (categoryFilter !== 'all') filteredTickets = filteredTickets.filter(i => i.category === categoryFilter);
  if (statusFilter !== 'all') filteredTickets = filteredTickets.filter(i => i.status === statusFilter);
  if (productFilter !== 'all') filteredTickets = filteredTickets.filter(i => i.product === productFilter);
  if (searchTerm.trim()) {
    const lower = searchTerm.toLowerCase();
    filteredTickets = filteredTickets.filter(t =>
      t._id.toLowerCase().includes(lower) ||
      t.name.toLowerCase().includes(lower) ||
      t.email.toLowerCase().includes(lower) ||
      t.product?.toLowerCase().includes(lower)
    );
  }

  filteredTickets.sort((a, b) => {
    let aVal = sortField === 'assignee' ? (a.assignee?.name || '') : (a as any)[sortField] || '';
    let bVal = sortField === 'assignee' ? (b.assignee?.name || '') : (b as any)[sortField] || '';
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      const diff = new Date(aVal).getTime() - new Date(bVal).getTime();
      return sortDirection === 'asc' ? diff : -diff;
    }
    return sortDirection === 'asc' ? aVal.toString().localeCompare(bVal.toString()) : bVal.toString().localeCompare(aVal.toString());
  });

  const stats = [
    { label: 'Total', value: tickets.length, color: 'bg-slate-500', text: 'text-slate-600' },
    { label: 'Open', value: tickets.filter(i => i.status === 'open').length, color: 'bg-blue-500', text: 'text-blue-600' },
    { label: 'In Progress', value: tickets.filter(i => i.status === 'in progress').length, color: 'bg-amber-500', text: 'text-amber-600' },
    { label: 'Resolved', value: tickets.filter(i => i.status === 'resolved').length, color: 'bg-emerald-500', text: 'text-emerald-600' },
  ];

  console.log(filteredTickets)

  return (
    <div className='min-h-screen bg-[#f8fafc] p-4 md:p-8'>
      <div className='max-w-[1600px] mx-auto'>
        <header className='mb-8'>
          <h1 className='text-2xl font-bold text-slate-800'>Support Dashboard</h1>
          <p className='text-slate-500 text-sm'>Manage and track incoming support requests</p>
        </header>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {stats.map((stat) => (
            <div key={stat.label} className='bg-white border border-slate-200 rounded-xl p-5 shadow-sm'>
              <div className={`w-2 h-2 rounded-full mb-3 ${stat.color}`} />
              <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>{stat.label}</p>
              <p className={`text-3xl font-black ${stat.text}`}>{stat.value}</p>
            </div>
          ))}
        </div>


        <div className='bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm'>
          <div className='flex flex-col lg:flex-row gap-4 items-end lg:items-center'>
            
            <div className='relative w-full lg:flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search by ID, name, email or product...'
                className='w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto'>
              <div className='relative'>
                <Filter className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none' />
                <select
                  className='appearance-none w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer'
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                >
                  <option value='all'>All Categories</option>
                  {Object.keys(categoryColors).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className='relative'>
                <CheckCircle2 className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none' />
                <select
                  className='appearance-none w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer'
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value='all'>All Status</option>
                  {Object.keys(statusColors).map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>

              <div className='relative'>
                <Box className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none' />
                <select
                  className='appearance-none w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer'
                  value={productFilter}
                  onChange={e => setProductFilter(e.target.value)}
                >
                  <option value='all'>All Products</option>
                  {products.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <button 
              onClick={resetFilters}
              className='flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors'
            >
              <RotateCcw className='w-4 h-4' />
              Reset
            </button>
          </div>
        </div>

        <div className='bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead className='bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500'>
                <tr>
                  <th className='px-4 py-4 w-24 text-center'>ID</th>
                  {renderHeader('Customer', 'name')}
                  {renderHeader('Contact', 'email')}
                  {renderHeader('Platform', 'platform')}
                  <th className='px-4 py-4 text-center'>Category</th>
                  <th className='px-4 py-4 text-center'>Status</th>
                  <th className='px-4 py-4 text-center'>Task</th>
                  {renderHeader('Created', 'createdAt')}
                  {renderHeader('Assignee', 'assignee')}
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {filteredTickets.map(ticket => (
                  <tr
                    key={ticket._id}
                    className='group hover:bg-blue-50/30 transition-colors cursor-pointer'
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td className='px-4 py-4 text-slate-400 font-mono text-[10px] text-center'>
                      #{ticket._id.slice(-6).toUpperCase()}
                    </td>
                    <td className='px-4 py-4 font-semibold text-slate-700'>{ticket.name}</td>
                    <td className='px-4 py-4 text-slate-500 text-[11px]'>{ticket.email}</td>
                    <td className='px-4 py-4 text-slate-600'>{ticket.platform || '—'}</td>
                    <td className='px-4 py-4'>
                      <span className={`block text-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${categoryColors[ticket.category]}`}>
                        {ticket.category}
                      </span>
                    </td>
                    <td className='px-4 py-4'>
                      <span className={`block text-center px-2 py-1 rounded-lg text-[10px] font-bold border capitalize ${statusColors[ticket.status]}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className='px-4 py-4 text-center'>
                      {ticket.taskReferenceUrl ? (
                        <a
                          href={ticket.taskReferenceUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={e => e.stopPropagation()}
                          className='text-blue-500 hover:text-blue-700 font-bold underline text-[10px]'
                        >
                          OPEN
                        </a>
                      ) : '—'}
                    </td>
                    <td className='px-4 py-4 text-slate-500 text-[11px]'>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-4 py-4'>
                      {ticket.assignee ? (
                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white'>
                            {ticket.assignee.name?.charAt(0)}
                          </div>
                          <span className='text-slate-700 text-[11px] font-medium'>{}</span>
                        </div>
                      ) : (
                        <span className='text-slate-300 italic text-[11px]'>Unassigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTickets.length === 0 && (
            <div className='p-12 text-center text-slate-400'>
              <div className='mb-2 text-3xl'>🔍</div>
              <p>No tickets match your current filters.</p>
            </div>
          )}
        </div>
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          activeUsers={activeUsers}
          editStatus={editStatus}
          editCategory={editCategory}
          editTaskUrl={editTaskUrl}
          editAssignee={editAssignee}
          setEditStatus={setEditStatus}
          setEditCategory={setEditCategory}
          setEditTaskUrl={setEditTaskUrl}
          setEditAssignee={setEditAssignee}
          setEditResolution={setEditResolution}
          onClose={() => setSelectedTicket(null)}
          onDelete={handleDelete}
          onSave={handleUpdate}
          statusColors={statusColors}
          categoryColors={categoryColors}
        />
      )}
      {apiState.status === 'loading' && <LoadingOverlay />}
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default TicketingSupportSystemPage;