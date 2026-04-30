import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../UI/Card';

interface ChartData {
  name: string;
  value: number;
}

export const SpendingChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  return (
    <Card title="Spending Breakdown" className="chart-card">
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3fb950" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3fb950" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#8b949e" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#8b949e" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#161b22', 
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#f0f6fc'
              }}
              itemStyle={{ color: '#3fb950' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3fb950" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .chart-card {
          grid-column: span 8;
        }
        .chart-wrapper {
          width: 100%;
          margin-top: 1rem;
        }
        @media (max-width: 1024px) {
          .chart-card { grid-column: span 12; }
        }
      `}} />
    </Card>
  );
};
