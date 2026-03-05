import { useEffect, useState } from 'react';
import { getInquiries } from '../api/getInquiries';
import { deleteInquiry } from '../api/deleteInquiry';
import { updateInquiryStatus } from '../api/updateInquiryStatus';

type Inquiry = {
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
  assignee?: { name: string } | null;
  createdAt: string;
  updatedAt: string;
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
  Question: 'bg-violet-600 text-white',
  Complaint: 'bg-amber-600 text-white',
  'Feature Request': 'bg-emerald-600 text-white'
};

const OpsieTicketingSystem = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'email' | 'platform' | 'assignee' | 'createdAt' | 'updatedAt'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getInquiries();
    setInquiries(data);
  };

  const handleDelete = async (id: string) => {
    await deleteInquiry(id);
    setInquiries(prev => prev.filter(i => i._id !== id));
  };

  const handleStatusChange = async (
    id: string,
    status: Inquiry['status']
  ) => {
    await updateInquiryStatus(id, status);
    setInquiries(prev =>
      prev.map(i => (i._id === id ? { ...i, status } : i))
    );
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
        <span className='w-1 text-gray-400'>
          {sortField === field
            ? sortDirection === 'asc'
              ? '▲'
              : '▼'
            : '▲'}
        </span>
      </div>
    </th>
  );

  let filtered = [...inquiries];

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(i => i.category === categoryFilter);
  }

  if (statusFilter !== 'all') {
    filtered = filtered.filter(i => i.status === statusFilter);
  }

  if (searchTerm.trim()) {
    const lower = searchTerm.toLowerCase();
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(lower) ||
      i.email.toLowerCase().includes(lower) ||
      i.phone.toLowerCase().includes(lower) ||
      (i.address && i.address.toLowerCase().includes(lower))
    );
  }

  filtered.sort((a, b) => {
    let aVal: any;
    let bVal: any;

    if (sortField === 'assignee') {
      aVal = a.assignee?.name || '';
      bVal = b.assignee?.name || '';
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

  const total = inquiries.length;
  const openCount = inquiries.filter(i => i.status === 'open').length;
  const progressCount = inquiries.filter(i => i.status === 'in progress').length;
  const resolvedCount = inquiries.filter(i => i.status === 'resolved').length;

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
              <th className='px-4 py-2 min-w-[75px]'>ID</th>
              {renderHeader('Name', 'name')}
              {renderHeader('Email', 'email')}
              {renderHeader('Platform', 'platform')}
              <th className='px-4 py-2 text-center min-w-[140px]'>Category</th>
              <th className='px-4 py-2 text-center min-w-[100px]'>Status</th>
              <th className='px-4 py-2 min-w-[70px]'>Task</th>
              {renderHeader('Created', 'createdAt')}
              {renderHeader('Updated', 'updatedAt')}
              {renderHeader('Assignee', 'assignee')}
              <th className='px-4 py-2 min-w-[90px]'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y'>
            {filtered.map(inq => (
              <tr
                key={inq._id}
                className='hover:bg-gray-200 cursor-pointer'
                onClick={() => setSelectedInquiry(inq)}
              >
                <td className='px-4 py-3 text-gray-400 text-center min-w-[75px]'>
                  {inq._id.slice(-6)}
                </td>

                <td className='px-4 py-3 font-medium min-w-[115px]'>{inq.name}</td>
                <td className='px-4 py-3 text-gray-600 min-w-[160px]'>{inq.email}</td>
                <td className='px-4 py-3 text-gray-600 min-w-[110px]'>{inq.platform || '—'}</td>

                <td className='px-4 py-3 text-center min-w-[140px]'>
                  <div className={`text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[inq.category]}`}>
                    {inq.category}
                  </div>
                </td>

                <td className='px-4 py-3 text-center min-w-[100px]'>
                  <select
                    value={inq.status}
                    onClick={e => e.stopPropagation()}
                    onChange={e =>
                      handleStatusChange(
                        inq._id,
                        e.target.value as Inquiry['status']
                      )
                    }
                    className={`min-w-[100px] px-2 py-1 rounded text-xs font-medium cursor-pointer ${statusColors[inq.status]}`}
                  >
                    {Object.entries(statusColors).map(s => (
                      <option className={`${s[1]}`} key={s[0]} value={s[0]}>{s[0]}</option>
                    ))}
                  </select>
                </td>

                <td className='px-4 py-3 text-center min-w-[70px]'>
                  {inq.taskReferenceUrl ? (
                    <a
                      href={inq.taskReferenceUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={e => e.stopPropagation()}
                      className='text-blue-600 hover:underline'
                    >
                      Link
                    </a>
                  ) : '—'}
                </td>

                <td className='px-4 py-3 text-gray-500 min-w-[110px]'>
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>

                <td className='px-4 py-3 text-gray-500 min-w-[110px]'>
                  {new Date(inq.updatedAt).toLocaleDateString()}
                </td>

                <td className='px-4 py-3 text-gray-600 min-w-[105px]'>
                  {inq.assignee?.name || 'Unassigned'}
                </td>

                <td className='px-4 py-3 text-center min-w-[90px]'>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(inq._id);
                    }}
                    className='text-red-600 hover:text-red-800 cursor-pointer'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInquiry && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
          <div className='bg-white border rounded-md w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-lg'>

            <div className='px-6 py-4 border-b flex justify-between items-start'>
              <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                  {selectedInquiry.name}
                </h2>
                <p className='text-xs text-gray-500 mt-1'>
                  Ticket ID: {selectedInquiry._id}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className='text-4xl hover:text-black text-lg cursor-pointer'
              >
                ❌ 
              </button>
            </div>

            <div className='p-6 text-sm text-gray-700 space-y-6'>

              <div className='flex flex-wrap gap-3'>
                <div className={`px-3 py-1 rounded text-xs font-medium ${categoryColors[selectedInquiry.category]}`}>
                  {selectedInquiry.category}
                </div>

                <div className={`px-3 py-1 rounded text-xs font-medium ${statusColors[selectedInquiry.status]}`}>
                  {selectedInquiry.status}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>

                <div>
                  <p className='text-gray-500 text-xs'>Email</p>
                  <p>{selectedInquiry.email}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-xs'>Phone</p>
                  <p>{selectedInquiry.phone}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-xs'>Address</p>
                  <p>{selectedInquiry.address || '—'}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-xs'>Assignee</p>
                  <p>{selectedInquiry.assignee?.name || 'Unassigned'}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-xs'>Platform</p>
                  <p>{selectedInquiry.platform || '—'}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-xs'>Platform Version</p>
                  <p>{selectedInquiry.platformVersion || '—'}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-xs'>Created</p>
                  <p>{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-xs'>Updated</p>
                  <p>{new Date(selectedInquiry.updatedAt).toLocaleString()}</p>
                </div>

              </div>

              <div>
                <p className='text-gray-500 text-xs mb-1'>Task Reference</p>
                {selectedInquiry.taskReferenceUrl ? (
                  <a
                    href={selectedInquiry.taskReferenceUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline break-all'
                  >
                    {selectedInquiry.taskReferenceUrl}
                  </a>
                ) : (
                  <p>—</p>
                )}
              </div>

              <div>
                <p className='text-gray-500 text-xs mb-2'>Description</p>
                <div className='border rounded-md p-4 bg-gray-50 whitespace-pre-wrap'>
                  {selectedInquiry.description}
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