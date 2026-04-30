import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, PiggyBank } from 'lucide-react';
import { Card } from '../UI/Card';

interface SummaryData {
  netWorth: number;
  spending: number;
  savings: number;
  netWorthChange: number;
  spendingChange: number;
  savingsChange: number;
}

export const SummaryCards: React.FC<{ data: SummaryData }> = React.memo(({ data }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <Card className="summary-card">
      <div className="stat-content">
        <div className="stat-info">
          <span className="stat-label">{title}</span>
          <h2 className="stat-value">{formatCurrency(value)}</h2>
          <div className="stat-footer">
            <span className={`trend ${change >= 0 ? 'positive' : 'negative'}`}>
              {change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(change)}%
            </span>
            <span className="period">from last month</span>
          </div>
        </div>
        <div className={`icon-circle ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .summary-card {
          background: var(--bg-secondary) !important;
          border: 1px solid var(--border-primary);
        }
        .stat-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }
        .stat-value {
          font-size: 1.85rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .stat-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .trend {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .trend.positive { color: var(--success); }
        .trend.negative { color: var(--error); }
        .period {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-surface);
          color: var(--accent-primary);
        }
        .icon-circle.blue { color: var(--info); }
        .icon-circle.yellow { color: var(--warning); }
        .icon-circle.green { color: var(--success); }
      `}} />
    </Card>
  );

  return (
    <div className="summary-grid">
      <StatCard 
        title="Total Wealth" 
        value={data.netWorth} 
        change={data.netWorthChange} 
        icon={Wallet} 
        color="blue"
      />
      <StatCard 
        title="Monthly Outflow" 
        value={data.spending} 
        change={data.spendingChange} 
        icon={TrendingUp} 
        color="yellow"
      />
      <StatCard 
        title="Total Savings" 
        value={data.savings} 
        change={data.savingsChange} 
        icon={PiggyBank} 
        color="green"
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .summary-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
});
