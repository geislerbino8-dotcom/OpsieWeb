import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'User Management',
    description: 'Create users, reset passwords, update roles, and manage accounts.',
    icon: 'src/assets/icons/user_card.svg',
    route: 'users',
  },
  {
    title: 'Ticketing System',
    description: 'View, update, and manage all support tickets efficiently.',
    icon: 'src/assets/icons/ticket.svg',
    route: 'tickets',
  },
];

const DashboardPage = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  return (
    <div className='bg-gray-50 p-6'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>Opsie SSI Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {cards.map((card, i) => (
          <div
            key={card.title}
            onClick={() => navigate(card.route)}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`cursor-pointer bg-white border rounded-lg shadow-cyan-300 p-6 flex flex-col items-center justify-center gap-4
              transform transition-transform duration-300
              ${hoverIndex === i ? 'scale-102 shadow-lg' : 'scale-100'}
              hover:bg-gray-50`}
          >
            <img src={card.icon} alt={card.title} className='w-16 h-16' draggable='false' />
            <h2 className='text-lg font-semibold text-gray-800'>{card.title}</h2>
            <p className='text-sm text-gray-500 text-center'>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;