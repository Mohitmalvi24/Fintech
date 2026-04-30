import React from 'react';
import { Card } from '../UI/Card';

interface BudgetItem {
  category: string;
  spent: number;
  limit: number;
}

export const BudgetIntelligence: React.FC<{ budget: BudgetItem[] }> = ({ budget }) => {
  return (
    <Card title="Budget Intelligence" className="budget-card">
      <div className="budget-list">
        {budget.map((item) => {
          const percentage = Math.min((item.spent / item.limit) * 100, 100);
          const isOver = item.spent > item.limit;
          
          return (
            <div key={item.category} className="budget-item">
              <div className="budget-info">
                <span className="budget-name">{item.category}</span>
                <span className="budget-stats">
                  <span className={isOver ? 'error' : ''}>${item.spent}</span>
                  <span className="divider">/</span>
                  <span className="limit">${item.limit}</span>
                </span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className={`progress-bar ${isOver ? 'over' : ''}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .budget-card {
          grid-column: span 4;
        }
        .budget-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }
        .budget-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .budget-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
        .budget-name {
          font-weight: 500;
          color: var(--text-primary);
        }
        .budget-stats {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .divider { margin: 0 0.25rem; opacity: 0.5; }
        .limit { font-weight: 600; }
        .error { color: var(--error); font-weight: 600; }
        
        .progress-bar-container {
          height: 6px;
          background: var(--bg-surface);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: var(--accent-primary);
          border-radius: var(--radius-full);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .progress-bar.over {
          background: var(--error);
        }
        @media (max-width: 1024px) {
          .budget-card { grid-column: span 12; }
        }
      `}} />
    </Card>
  );
};
