import { useEffect, useState } from 'react';
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
  const [sortField, setSortField] = useState<'name' | 'email' | 'platform' | 'assignee' | 'createdAt' | 'updatedAt'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editStatus, setEditStatus] = useState<Ticket['status']>('open');
  const [editCategory, setEditCategory] = useState<Ticket['category']>('Inquiry');
  const [editTaskUrl, setEditTaskUrl] = useState('');
  const [editAssignee, setEditAssignee] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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

      setTickets(data);
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to load tickets', 'error');
    } finally {
      apiState.reset();
    }
  }

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
  }

  const handleUpdate = async () => {
    if (!selectedTicket) return;

    try {
      const ok = await confirm({
        title: 'Update Ticket',
        message: 'Are you sure you want to update this ticket?',
        confirmText: 'UPDATE'
      })

      if(!ok) return

      apiState.startLoading();

      const data = await updateTicket(selectedTicket._id, {
        status: editStatus,
        category: editCategory,
        taskReferenceUrl: editTaskUrl,
        assignee: editAssignee
      });

      addToast(data.message, 'success');

      const user = activeUsers.find(user => user._id === editAssignee)

      setTickets(prev =>
        prev.map(ticket =>
          ticket._id === selectedTicket._id
            ? {
                ...ticket,
                status: editStatus,
                category: editCategory,
                taskReferenceUrl: editTaskUrl,
                assignee: user ? { _id: user._id, name: user.name, role: user.role } : null,
              }
            : ticket
        )
      );

      await fetchTickets();
      await fetchActiveUsers();
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
      })

      if(!ok) return

      apiState.startLoading();

      await deleteTicket(selectedTicket._id);

      addToast('Ticket deleted', 'success');

      await fetchTickets();
      await fetchActiveUsers();
    } catch (error: any) {
      addToast(
        error.response?.data?.message || 'Delete failed',
        'error'
      );
    } finally {
      apiState.reset();
    }

    setTickets(prev => prev.filter(t => t._id !== selectedTicket._id));
    setSelectedTicket(null);
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
      className='px-4 py-3 cursor-pointer select-none hover:text-black font-medium whitespace-nowrap'
    >
      <div className='flex items-center gap-1'>
        <span>{label}</span>
        <span className='w-0.5 text-gray-400'>
          {sortField === field
            ? sortDirection === 'asc'
              ? '▲'
              : '▼'
            : '▲'}
        </span>
      </div>
    </th>
  );

  let filteredTickets = [...tickets];

  if (categoryFilter !== 'all') {
    filteredTickets = filteredTickets.filter(i => i.category === categoryFilter);
  }

  if (statusFilter !== 'all') {
    filteredTickets = filteredTickets.filter(i => i.status === statusFilter);
  }

  if (searchTerm.trim()) {
    const lower = searchTerm.toLowerCase();
    filteredTickets = filteredTickets.filter(t =>
      t._id.toLowerCase().includes(lower) ||
      t.name.toLowerCase().includes(lower) ||
      t.email.toLowerCase().includes(lower) ||
      t.phone.toLowerCase().includes(lower) ||
      (t.address && t.address.toLowerCase().includes(lower))
    );
  }

  filteredTickets.sort((a, b) => {
    let aVal: any;
    let bVal: any;

    if (sortField === 'assignee') {
      aVal = a.assignee || '';
      bVal = b.assignee || '';
    } else {
      aVal = (a as any)[sortField] || '';
      bVal = (b as any)[sortField] || '';
    }

    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      const diff =
        new Date(aVal).getTime() - new Date(bVal).getTime();
      return sortDirection === 'asc' ? diff : -diff;
    }

    return sortDirection === 'asc'
      ? aVal.toString().localeCompare(bVal.toString())
      : bVal.toString().localeCompare(aVal.toString());
  });

  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  const confirm = useConfirm();

  const total = tickets.length;
  const openCount = tickets.filter(i => i.status === 'open').length;
  const progressCount = tickets.filter(i => i.status === 'in progress').length;
  const resolvedCount = tickets.filter(i => i.status === 'resolved').length;

  return (
    <div className='min-h-full min-w-full bg-gray-50 p-6'>
      <h1 className='text-xl font-semibold mb-6 text-gray-800 text-center'>
        Opsie SSI Ticketing Support System Dashboard
      </h1>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm'>
        <div className='bg-white border rounded-md p-4'>
          <p className='text-gray-500'>Total</p>
          <p className='text-lg font-semibold'>{total}</p>
        </div>
        <div className='bg-white border rounded-md p-4'>
          <p className='text-gray-500'>Open</p>
          <p className='text-lg font-semibold text-blue-600'>{openCount}</p>
        </div>
        <div className='bg-white border rounded-md p-4'>
          <p className='text-gray-500'>In Progress</p>
          <p className='text-lg font-semibold text-yellow-600'>{progressCount}</p>
        </div>
        <div className='bg-white border rounded-md p-4'>
          <p className='text-gray-500'>Resolved</p>
          <p className='text-lg font-semibold text-green-600'>{resolvedCount}</p>
        </div>
      </div>

      <div className='flex flex-col justify-center md:flex-row gap-3 mb-4 text-sm'>
        <input
          type='text'
          placeholder='Search...'
          className='border rounded-md px-3 py-2 w-full md:w-1/3'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className='border rounded-md px-3 py-2 w-full md:w-1/5'
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value='all'>All Categories</option>
          {Object.keys(categoryColors).map(category => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <select
          className='border rounded-md px-3 py-2 w-full md:w-1/5'
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value='all'>All Status</option>
          {Object.keys(statusColors).map(status => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className='max-w-313 mx-auto bg-white border rounded-md overflow-x-auto'>
        <table className='min-w-312.5 text-xs table-fixed'>
          <thead className='bg-gray-100 border-b text-gray-600 uppercase tracking-wide'>
            <tr>
              <th className='px-4 py-2 w-18.75'>ID</th>
              {renderHeader('Name', 'name')}
              {renderHeader('Email', 'email')}
              {renderHeader('Platform', 'platform')}
              <th className='px-4 py-2 text-center w-42.5'>Category</th>
              <th className='px-4 py-2 text-center w-31.25'>Status</th>
              <th className='px-4 py-2 w-25'>Task</th>
              {renderHeader('Created', 'createdAt')}
              {renderHeader('Updated', 'updatedAt')}
              {renderHeader('Assignee', 'assignee')}
            </tr>
          </thead>

          <tbody className='divide-y'>
            {filteredTickets.map(ticket => (
              <tr
                key={ticket._id}
                className='h-12.5 hover:bg-gray-200 cursor-pointer'
                onClick={() => setSelectedTicket(ticket)}
              >
                <td className='px-4 py-3 text-gray-400 text-center w-22'>
                  {ticket._id.slice(-8)}
                </td>

                <td className='px-4 py-3 font-medium w-32.5'>{ticket.name}</td>
                <td className='px-4 py-3 text-gray-600 w-42.5'>{ticket.email}</td>
                <td className='px-4 py-3 text-gray-600 w-23.75'>{ticket.platform || '—'}</td>

                <td className='px-4 py-3 text-center w-42.5'>
                  <div className={`text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[ticket.category]}`}>
                    {ticket.category}
                  </div>
                </td>

                <td className='px-4 py-3 text-center w-31.25'>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </div>
                </td>
              
                <td className='px-4 py-3 text-center w-25'>
                  {ticket.taskReferenceUrl ? (
                    <a
                      href={ticket.taskReferenceUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={e => e.stopPropagation()}
                      className='text-blue-600 hover:underline'
                    >
                      Link
                    </a>
                  ) : '—'}
                </td>

                <td className='px-4 py-3 text-gray-500 w-25'>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>

                <td className='px-4 py-3 text-gray-500 w-25'>
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </td>

                <td className='px-4 py-3 text-gray-600'>
                  {ticket.assignee ? ( 
                    <div className='flex items-center gap-2'>
                      <div className='min-w-7 min-h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold'> 
                        {ticket.assignee.name.charAt(0)}
                      </div>

                      <span className='text-center'>{ticket.assignee.name}</span>
                    </div>
                  ) : ( 
                    <span className='text-gray-400'>Unassigned</span> 
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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