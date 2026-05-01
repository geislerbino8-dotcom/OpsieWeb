import { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Box, 
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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
    _id: string;
    name: string;
    role: string;
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
  open: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'in progress': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  resolved: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  "won't fix": 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  closed: 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300',
};

const categoryColors = {
  Inquiry: 'bg-indigo-600 text-white',
  'Bug Report': 'bg-rose-600 text-white',
  Question: 'bg-lime-600 text-white',
  Complaint: 'bg-amber-600 text-white',
  'Feature Request': 'bg-emerald-600 text-white'
};

const ITEMS_PER_PAGE = 10;

const TicketingSupportSystemPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'email' | 'platform' | 'assignee' | 'createdAt' | 'updatedAt'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const [editStatus, setEditStatus] = useState<Ticket['status']>('open');
  const [editCategory, setEditCategory] = useState<Ticket['category']>('Inquiry');
  const [editTaskUrl, setEditTaskUrl] = useState('');
  const [editAssignee, setEditAssignee] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [editResolution, setEditResolution] = useState<string>();

  const apiState = useApiState();
  const { toasts, addToast } = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    fetchTickets();
    fetchActiveUsers();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter, productFilter]);

  useEffect(() => {
    if (selectedTicket) {
      setEditStatus(selectedTicket.status);
      setEditCategory(selectedTicket.category);
      setEditTaskUrl(selectedTicket.taskReferenceUrl || '');
      setEditAssignee(selectedTicket.assignee?._id || null);
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
    setSelectedTicket(null);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setProductFilter('all');
    setCurrentPage(1);
  };

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
      className='px-4 py-3 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-200 transition-colors'
    >
      <div className='flex items-center gap-2'>
        <span>{label}</span>
        <span className='text-[10px] text-gray-400'>
          {sortField === field ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </div>
    </th>
  );

  // --- Filtering Logic ---
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

  // --- Sorting Logic ---
  filteredTickets.sort((a, b) => {
    let aVal = sortField === 'assignee' ? (a.assignee?.name || '') : (a as any)[sortField] || '';
    let bVal = sortField === 'assignee' ? (b.assignee?.name || '') : (b as any)[sortField] || '';
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      const diff = new Date(aVal).getTime() - new Date(bVal).getTime();
      return sortDirection === 'asc' ? diff : -diff;
    }
    return sortDirection === 'asc' ? aVal.toString().localeCompare(bVal.toString()) : bVal.toString().localeCompare(aVal.toString());
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const stats = [
    { label: 'Total', value: tickets.length, color: 'bg-slate-500', text: 'text-slate-600 dark:text-slate-300' },
    { label: 'Open', value: tickets.filter(i => i.status === 'open').length, color: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
    { label: 'In Progress', value: tickets.filter(i => i.status === 'in progress').length, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { label: 'Resolved', value: tickets.filter(i => i.status === 'resolved').length, color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className='min-h-screen bg-[#f8fafc] dark:bg-slate-950 p-4 md:p-8 transition-colors'>
      <div className='max-w-[1600px] mx-auto'>
        <header className='mb-8 flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold text-slate-800 dark:text-white'>Support Dashboard</h1>
            <p className='text-slate-500 dark:text-slate-400 text-sm'>Manage and track incoming support requests</p>
          </div>
        </header>

        {/* Stats Section */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {stats.map((stat) => (
            <div key={stat.label} className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm transition-colors'>
              <div className={`w-2 h-2 rounded-full mb-3 ${stat.color}`} />
              <p className='text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500'>{stat.label}</p>
              <p className={`text-3xl font-black ${stat.text}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 shadow-sm transition-colors'>
          <div className='flex flex-col lg:flex-row gap-4 items-end lg:items-center'>
            <div className='relative w-full lg:flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search by ID, name, email or product...'
                className='w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto'>
              <div className='relative'>
                <Filter className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none' />
                <select
                  className='appearance-none w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer'
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
                  className='appearance-none w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer'
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
                  className='appearance-none w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer'
                  value={productFilter}
                  onChange={e => setProductFilter(e.target.value)}
                >
                  <option value='all'>All Products</option>
                  {products.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={resetFilters}
              className='flex items-center gap-2 px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-colors'
            >
              <RotateCcw className='w-4 h-4' />
              Reset
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden transition-colors'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead className='bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400'>
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
              <tbody className='divide-y divide-slate-100 dark:divide-slate-700'>
                {paginatedTickets.map(ticket => (
                  <tr
                    key={ticket._id}
                    className='group hover:bg-blue-50/30 dark:hover:bg-slate-700/50 transition-colors cursor-pointer'
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td className='px-4 py-4 text-slate-400 dark:text-slate-500 font-mono text-[10px] text-center'>
                      #{ticket._id.slice(-6).toUpperCase()}
                    </td>
                    <td className='px-4 py-4 font-semibold text-slate-700 dark:text-slate-200'>{ticket.name}</td>
                    <td className='px-4 py-4 text-slate-500 dark:text-slate-400 text-[11px]'>{ticket.email}</td>
                    <td className='px-4 py-4 text-slate-600 dark:text-slate-300'>{ticket.platform || '—'}</td>
                    <td className='px-4 py-4'>
                      <span className={`block text-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${categoryColors[ticket.category]}`}>
                        {ticket.category}
                      </span>
                    </td>
                    <td className='px-4 py-4'>
                      <span className={`block text-center px-2 py-1 rounded-lg text-[10px] font-bold border dark:border-transparent capitalize ${statusColors[ticket.status]}`}>
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
                          className='text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold underline text-[10px]'
                        >
                          OPEN
                        </a>
                      ) : <span className="text-slate-300 dark:text-slate-600">—</span>}
                    </td>
                    <td className='px-4 py-4 text-slate-500 dark:text-slate-400 text-[11px]'>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-4 py-4'>
                      {ticket.assignee ? (
                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white dark:ring-slate-800'>
                            {ticket.assignee.name?.charAt(0)}
                          </div>
                          <span className='text-slate-700 dark:text-slate-300 text-[11px] font-medium'>{ticket.assignee.name}</span>
                        </div>
                      ) : (
                        <span className='text-slate-300 dark:text-slate-600 italic text-[11px]'>Unassigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className='px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <p className='text-xs text-slate-500 dark:text-slate-400'>
              Showing <span className='font-medium text-slate-700 dark:text-slate-200'>{filteredTickets.length > 0 ? startIndex + 1 : 0}</span> to{' '}
              <span className='font-medium text-slate-700 dark:text-slate-200'>
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredTickets.length)}
              </span> of{' '}
              <span className='font-medium text-slate-700 dark:text-slate-200'>{filteredTickets.length}</span> results
            </p>
            
            <div className='flex items-center gap-2'>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all'
              >
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
              
              <div className='flex items-center gap-1'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Basic logic to show current, first, last, and neighboring pages
                  if (
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="text-slate-400 text-[10px]">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className='p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all'
              >
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>

          {filteredTickets.length === 0 && (
            <div className='p-12 text-center text-slate-400 dark:text-slate-600'>
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