import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import userImg from '../../.././assets/icons/user_card.svg';
import ticketImg from '../../../assets/icons/ticket.svg';
import AnalyticsBarChart from '@/components/charts/AnalyticsBarChart';
import AnalyticsPieChart from '@/components/charts/AnalyticsPieChart';
import { useEffect, useState } from 'react';
import { getCategory } from '@/api/getCategory';
import { getProductAnalytics } from '@/api/getProductAnalytics';

const cards = [
  {
    title: 'User Management',
    description: 'Create users, reset passwords, and manage account permissions.',
    icon: userImg,
    route: 'users',
  },
  {
    title: 'Ticketing System',
    description: 'View, update, and resolve support tickets efficiently.',
    icon: ticketImg,
    route: 'tickets',
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const [ category, setCategory ] = useState()
  const [ product, setProduct] = useState()

  useEffect(()=> {
    getCategoryAnalytics()
    getProduct()
  }, [])

  const getCategoryAnalytics = async ()=> {
    try {
      
      const data = await getCategory()
      setCategory(data)

    } catch (error) {
      console.log(error)
    }
  }

  const getProduct = async ()=> {
    try {
      
      const data = await getProductAnalytics()
      console.log(data)
      setProduct(data)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen w-full bg-[#f8fafc] pb-12">
      <div className="bg-white border-b border-slate-200 mb-8">
        <header className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Opsie SSI <span className="text-blue-600">Portal</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm md:text-base">
            Welcome back. Monitor your system activity and manage modules below.
          </p>
        </header>
      </div>

      <main className="max-w-7xl mx-auto px-6 space-y-8">
        
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Client Ticket Analytics</h3>
              <p className="text-sm text-slate-400">Activity overview for the last 7 days</p>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-4">
              <AnalyticsBarChart chartData={category || []} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Ticket Percentage By Product</h3>
              <p className="text-sm text-slate-400">Distribution by category</p>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-4">
              <AnalyticsPieChart chartData={product || []} />
            </div>
          </div>
        </section>

        <section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.route)}
                className="group cursor-pointer bg-white border border-slate-200 rounded-2xl p-6 
                           transition-all duration-300 hover:border-blue-300 hover:shadow-md active:scale-[0.98]"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <img src={card.icon} alt="" className="w-10 h-10 object-contain" />
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-semibold text-blue-600">
                  <span>Open Module</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 opacity-60">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl font-light">+</span>
              </div>
              <p className="text-xs font-medium uppercase tracking-wider">Coming Soon</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;