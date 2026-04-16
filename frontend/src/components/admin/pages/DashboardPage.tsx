import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import userImg from '../../.././assets/icons/user_card.svg';
import ticketImg from '../../../assets/icons/ticket.svg';
import AnalyticsBarChart from '@/components/charts/AnalyticsBarChart';
import AnalyticsPieChart from '@/components/charts/AnalyticsPieChart';
import { useEffect, useState } from 'react';
import { getCategory } from '@/api/getCategory';
import { getProductAnalytics } from '@/api/getProductAnalytics';
import AnalyticsLineChart from '../../charts/AnalyticsLineChart';

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

  const [category, setCategory] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    getCategoryAnalytics();
    getProduct();
  }, []);

  const getCategoryAnalytics = async () => {
    try {
      const data = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const data = await getProductAnalytics();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-slate-950 pb-12 transition-colors duration-300">
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 mb-8 transition-colors">
        <header className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Opsie SSI <span className="text-blue-600 dark:text-blue-500">Portal</span>
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Welcome back. Monitor your system activity and manage modules below.
          </p>
        </header>
      </div>

      <main className="max-w-7xl mx-auto px-6 space-y-8">
        {/* LINE CHART SECTION */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <AnalyticsLineChart />
        </div>

        {/* ANALYTICS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BAR CHART */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Client Ticket Analytics</h3>
              <p className="text-sm text-slate-400 dark:text-slate-500">Activity overview for the last 7 days</p>
            </div>
            <div className="h-[320px] w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 transition-colors">
              <AnalyticsBarChart chartData={category || []} />
            </div>
          </div>

          {/* PIE CHART */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Ticket Percentage By Product</h3>
              <p className="text-sm text-slate-400 dark:text-slate-500">Distribution by category</p>
            </div>
            <div className="h-[320px] w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 transition-colors">
              <AnalyticsPieChart chartData={product || []} />
            </div>
          </div>
        </section>

        {/* NAVIGATION CARDS */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.route)}
                className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 
                           transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 active:scale-[0.98]"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-slate-50 dark:bg-slate-800">
                  <img src={card.icon} alt="" className="w-10 h-10 object-contain" />
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <span>Open Module</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}

            {/* COMING SOON PLACEHOLDER */}
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl font-light text-slate-400">+</span>
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