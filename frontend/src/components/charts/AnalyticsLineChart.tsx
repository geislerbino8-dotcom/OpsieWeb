import { getTicketVelocity } from '@/api/getTicketVelocity';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';



const AnalyticsLineChart = () => {


    const [ ticketVelocity, setTicketVelocity ] = useState()

    useEffect(()=> {
        fetchTicketVelocity()
    }, [])

    const fetchTicketVelocity = async ()=> {
        try {

            const data = await getTicketVelocity()

            console.log(data)
            setTicketVelocity(data)
            
        } catch (error) {
           console.log(error) 
        }
    }

  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Ticket Velocity</h3>
        <p className="text-sm text-gray-500">Comparison of created vs resolved tickets</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={ticketVelocity} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#e2e8f0" 
            className="dark:stroke-slate-800"
          />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff' 
            }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          
          {/* Created Tickets Line */}
          <Line
            name="Created"
            type="monotone"
            dataKey="created"
            stroke="#3b82f6" // Blue-500
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />

          {/* Resolved Tickets Line */}
          <Line
            name="Resolved"
            type="monotone"
            dataKey="resolved"
            stroke="#10b981" // Emerald-500
            strokeWidth={3}
            dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsLineChart;