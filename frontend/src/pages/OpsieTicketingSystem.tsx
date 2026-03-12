import { useEffect, useState } from 'react';
import { getTickets } from '../api/getTickets';
import { deleteTicket } from '../api/deleteTicket';
import { updateTicket } from '../api/updateTicket';
import { getUsers } from '../api/getUsers';

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
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
};

type User = {
  _id: string;
  name: string;
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

const OpsieTicketingSystem = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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
    fetchData();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      setEditStatus(selectedTicket.status);
      setEditCategory(selectedTicket.category);
      setEditAssignee(selectedTicket.assignee || '');
      setEditTaskUrl(selectedTicket.taskReferenceUrl || '');
    }
  }, [selectedTicket]);

  const fetchData = async () => {
    const data = await getTickets();
    setTickets(data);
  };

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async () => {
    if (!selectedTicket) return;
    await deleteTicket(selectedTicket._id);

    setTickets(prev => prev.filter(t => t._id !== selectedTicket._id));
    setSelectedTicket(null);
  };

  const handleUpdate = async () => {
    if (!selectedTicket) return;

    await updateTicket(selectedTicket._id, {
      status: editStatus,
      category: editCategory,
      taskReferenceUrl: editTaskUrl,
      assignee: editAssignee === '' ? null : editAssignee
    });

    setTickets(prev =>
      prev.map(t =>
        t._id === selectedTicket._id
          ? {
              ...t,
              status: editStatus,
              category: editCategory,
              taskReferenceUrl: editTaskUrl,
              assignee: users.find(u => u._id === editAssignee)?.name || null
            }
          : t
      )
    );

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

  const total = tickets.length;
  const openCount = tickets.filter(i => i.status === 'open').length;
  const progressCount = tickets.filter(i => i.status === 'in progress').length;
  const resolvedCount = tickets.filter(i => i.status === 'resolved').length;

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-xl font-semibold mb-6 text-gray-800'>
        Opsie SSI Ticket Dashboard
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

      <div className='flex flex-col md:flex-row gap-3 mb-4 text-sm'>
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
          {Object.keys(categoryColors).map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className='border rounded-md px-3 py-2 w-full md:w-1/5'
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value='all'>All Status</option>
          {Object.keys(statusColors).map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className='bg-white border rounded-md overflow-x-auto overflow-y-scroll'>
        <table className='min-w-full text-xs table-fixed'>
          <thead className='bg-gray-100 border-b text-gray-600 uppercase tracking-wide'>
            <tr>
              <th className='px-4 py-2 w-[75px]'>ID</th>
              {renderHeader('Name', 'name')}
              {renderHeader('Email', 'email')}
              {renderHeader('Platform', 'platform')}
              <th className='px-4 py-2 text-center w-[170px]'>Category</th>
              <th className='px-4 py-2 text-center w-[125px]'>Status</th>
              <th className='px-4 py-2 w-[125px]'>Task</th>
              {renderHeader('Created', 'createdAt')}
              {renderHeader('Updated', 'updatedAt')}
              {renderHeader('Assignee', 'assignee')}
            </tr>
          </thead>

          <tbody className='divide-y'>
            {filteredTickets.map(ticket => (
              <tr
                key={ticket._id}
                className='h-[50px] hover:bg-gray-200 cursor-pointer'
                onClick={() => setSelectedTicket(ticket)}
              >
                <td className='px-4 py-3 text-gray-400 text-center w-[75px]'>
                  {ticket._id.slice(-6)}
                </td>

                <td className='px-4 py-3 font-medium w-[130px]'>{ticket.name}</td>
                <td className='px-4 py-3 text-gray-600 w-[170px]'>{ticket.email}</td>
                <td className='px-4 py-3 text-gray-600 w-[95px]'>{ticket.platform || '—'}</td>

                <td className='px-4 py-3 text-center w-[170px]'>
                  <div className={`text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[ticket.category]}`}>
                    {ticket.category}
                  </div>
                </td>

                <td className='px-4 py-3 text-center w-[125px]'>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </div>
                </td>
              
                <td className='px-4 py-3 text-center w-[125px]'>
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

                <td className='px-4 py-3 text-gray-500 w-[100px]'>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>

                <td className='px-4 py-3 text-gray-500 w-[100px]'>
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </td>

                <td className='px-4 py-3 text-gray-600'>
                  {ticket.assignee ? ( 
                    <div className='flex items-center gap-2'>
                      <div className='min-w-7 min-h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold'> 
                      </div>
                      <span className='text-center'></span>
                    </div>
                  ) : ( <span className='text-gray-400'>Unassigned</span> )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl'>
            <div className='px-6 py-4 border-b flex justify-between items-center'>
              <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                  {selectedTicket.name}
                </h2>
                <p className='text-xs text-gray-500'>
                  Ticket ID: {selectedTicket._id}
                </p>
              </div>

              <button
                onClick={() => setSelectedTicket(null)}
                className='text-gray-500 hover:text-black text-xl cursor-pointer'
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className='grid md:grid-cols-3 gap-6 p-6'>
              <div className='md:col-span-2 space-y-6'>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Description</p>
                  <div className='border rounded-md p-4 bg-gray-50 whitespace-pre-wrap text-sm'>
                    {selectedTicket.description}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4 text-sm'>

                  <div>
                    <p className='text-gray-500 text-xs'>Email</p>
                    <p>{selectedTicket.email}</p>
                  </div>

                  <div>
                    <p className='text-gray-500 text-xs'>Phone</p>
                    <p>{selectedTicket.phone}</p>
                  </div>

                  <div>
                    <p className='text-gray-500 text-xs'>Address</p>
                    <p>{selectedTicket.address || '—'}</p>
                  </div>

                  <div>
                    <p className='text-gray-500 text-xs'>Platform</p>
                    <p>{selectedTicket.platform || '—'}</p>
                  </div>

                  <div>
                    <p className='text-gray-500 text-xs'>Platform Version</p>
                    <p>{selectedTicket.platformVersion || '—'}</p>
                  </div>

                  <div>
                    <p className='text-gray-500 text-xs'>Created</p>
                    <p>{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                  </div>

                  <div>
                    <p className='text-gray-500 text-xs'>Updated</p>
                    <p>{new Date(selectedTicket.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className='space-y-5'>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Category</p>
                  <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value as Ticket['category'])}
                    className='border rounded-md w-full px-3 py-2 text-sm'
                  >
                    {Object.keys(categoryColors).map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className='text-xs text-gray-500 mb-1'>Status</p>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as Ticket['status'])}
                    className='border rounded-md w-full px-3 py-2 text-sm'
                  >
                    {Object.keys(statusColors).map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className='text-xs text-gray-500 mb-1'>Task Reference</p>
                  <input
                    value={editTaskUrl}
                    onChange={e => setEditTaskUrl(e.target.value)}
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
                    <option key='unassigned' value='' >Unassigned</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='px-6 py-4 border-t bg-gray-50'>
              <div className='flex flex-col sm:flex-row sm:justify-between gap-3'>
                <button
                  onClick={handleDelete}
                  className='w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 cursor-pointer'
                >
                  Delete Ticket
                </button>

                <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className='w-full sm:w-auto px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100 cursor-pointer'
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleUpdate}
                    className='w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpsieTicketingSystem;