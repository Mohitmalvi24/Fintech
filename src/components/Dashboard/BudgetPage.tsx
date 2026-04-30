import React from 'react';
import { Card } from '../UI/Card';
import { 
  Home, ShoppingCart, Film, Zap, 
  TrendingUp, PiggyBank, Sparkles, AlertTriangle 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  spent: number;
  limit: number;
  status: 'FIXED' | 'HEALTHY' | 'CRITICAL' | 'OPTIMAL';
  icon: string;
}

interface BudgetData {
  totalVelocity: number;
  totalLimit: number;
  daysRemaining: number;
  projectedSurplus: number;
  savingsEfficiency: number;
  categories: Category[];
  strategy: {
    potentialSavings: number;
    description: string;
  };
  alerts: any[];
}

export const BudgetPage: React.FC<{ data: BudgetData }> = ({ data }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home size={20} />;
      case 'ShoppingCart': return <ShoppingCart size={20} />;
      case 'Film': return <Film size={20} />;
      case 'Zap': return <Zap size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  const velocityPercent = (data.totalVelocity / data.totalLimit) * 100;

  return (
    <div className="budget-page">
      <div className="budget-header">
        <div>
          <h1 className="page-title">Monthly Overview</h1>
          <p className="sub-title">Fiscal Period: October 2023</p>
        </div>
        <button className="adjust-btn">+ Adjust Limits</button>
      </div>

      <div className="budget-grid">
        {/* Main Content (Left) */}
        <div className="main-col">
          <Card className="velocity-card">
            <span className="card-label">TOTAL BUDGET VELOCITY</span>
            <div className="velocity-value">
              <h2>{formatCurrency(data.totalVelocity)}</h2>
              <span>/ {formatCurrency(data.totalLimit)}</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${velocityPercent}%` }}></div>
            </div>
            <div className="velocity-footer">
              <span>{Math.round(velocityPercent)}% of monthly limit reached</span>
              <span>{data.daysRemaining} days remaining</span>
            </div>
          </Card>

          <div className="category-section">
            <div className="section-header">
              <h3>Category Allocation</h3>
              <button className="text-link">View All Categories</button>
            </div>
            <div className="category-grid">
              {data.categories.map((cat) => (
                <Card key={cat.id} className="category-card">
                  <div className="cat-top">
                    <div className="cat-icon">{getIcon(cat.icon)}</div>
                    <span className={`cat-status ${cat.status.toLowerCase()}`}>{cat.status}</span>
                  </div>
                  <h4 className="cat-name">{cat.name}</h4>
                  <div className="cat-stats">
                    <span className="cat-amount">{formatCurrency(cat.spent)} / {formatCurrency(cat.limit)}</span>
                    <span className="cat-percent">{Math.round((cat.spent / cat.limit) * 100)}%</span>
                  </div>
                  <div className="progress-container mini">
                    <div className={`progress-bar ${cat.status.toLowerCase()}`} style={{ width: `${(cat.spent / cat.limit) * 100}%` }}></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="side-col">
          <Card className="metric-card surplus">
            <span className="card-label">PROJECTED SURPLUS</span>
            <div className="metric-content">
              <h3>+{formatCurrency(data.projectedSurplus)}</h3>
              <div className="metric-indicator blue"></div>
            </div>
          </Card>

          <Card className="metric-card efficiency">
            <span className="card-label">SAVINGS EFFICIENCY</span>
            <div className="metric-content">
              <h3>{data.savingsEfficiency}%</h3>
              <div className="metric-indicator yellow"></div>
            </div>
          </Card>

          <Card className="strategy-card">
            <div className="strategy-header">
              <div className="strategy-icon"><Sparkles size={18} /></div>
              <span>BUDGET STRATEGY</span>
            </div>
            <h3>Optimize your spending to save <span className="highlight">{formatCurrency(data.strategy.potentialSavings)}</span> next month.</h3>
            <p>{data.strategy.description}</p>
            <button className="apply-btn">Apply Strategy</button>
          </Card>

          <div className="recent-alerts">
            <div className="section-header">
              <h3><AlertTriangle size={16} /> RECENT ALERTS</h3>
            </div>
            {(data.alerts || []).slice(0, 2).map((alert, idx) => (
              <div key={idx} className="small-alert">
                <div className={`alert-line ${alert.type}`}></div>
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .budget-page {
          animation: fade-in 0.5s ease-out;
        }
        .budget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .page-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .sub-title {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .adjust-btn {
          background: var(--accent-primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .budget-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
        }
        .main-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .side-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        /* Velocity Card */
        .velocity-card {
          padding: 2rem !important;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
        }
        .card-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
          display: block;
        }
        .velocity-value {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .velocity-value h2 {
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .velocity-value span {
          color: var(--text-muted);
          font-size: 1.25rem;
        }
        .progress-container {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .progress-bar {
          height: 100%;
          background: var(--accent-primary);
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }
        .velocity-footer {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Categories */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .section-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .text-link {
          color: var(--accent-primary);
          font-size: 0.85rem;
          font-weight: 600;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .category-card {
          padding: 1.5rem !important;
        }
        .cat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .cat-icon {
          width: 40px;
          height: 40px;
          background: var(--bg-surface);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }
        .cat-status {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .cat-status.fixed { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); }
        .cat-status.healthy { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .cat-status.critical { background: rgba(239, 68, 68, 0.1); color: var(--error); }
        .cat-status.optimal { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
        
        .cat-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .cat-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
        }
        .cat-amount { color: var(--text-muted); }
        .cat-percent { font-weight: 700; color: var(--text-primary); }
        .progress-container.mini { height: 4px; }
        .progress-bar.fixed { background: var(--accent-primary); }
        .progress-bar.healthy { background: var(--success); }
        .progress-bar.critical { background: var(--error); }
        .progress-bar.optimal { background: var(--warning); }

        /* Metric Cards */
        .metric-card {
          padding: 1.25rem 1.5rem !important;
        }
        .metric-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }
        .metric-content h3 {
          font-size: 1.75rem;
          font-weight: 700;
        }
        .metric-indicator {
          width: 4px;
          height: 24px;
          border-radius: 2px;
        }
        .metric-indicator.blue { background: var(--accent-primary); box-shadow: 0 0 10px var(--accent-primary); }
        .metric-indicator.yellow { background: var(--warning); box-shadow: 0 0 10px var(--warning); }

        /* Strategy Card */
        .strategy-card {
          background: var(--accent-primary) !important;
          color: white;
          padding: 1.5rem !important;
        }
        .strategy-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .strategy-icon {
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .strategy-card h3 {
          font-size: 1.25rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }
        .strategy-card p {
          font-size: 0.85rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .apply-btn {
          width: 100%;
          background: white;
          color: var(--accent-primary);
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        /* Alerts */
        .small-alert {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 10px;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .alert-line {
          width: 3px;
          height: 16px;
          border-radius: 2px;
        }
        .alert-line.warning { background: var(--warning); }
        .alert-line.error { background: var(--error); }
        .alert-line.info { background: var(--info); }
      `}} />
    </div>
  );
};
