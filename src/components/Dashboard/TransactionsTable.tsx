import React from 'react';
import { Card } from '../UI/Card';
import { Filter, ChevronRight } from 'lucide-react';
import { useAnalytics } from '../../hooks';

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  status: string;
}

export const TransactionsTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const { trackEvent } = useAnalytics();

  const handleFilterClick = (category: string) => {
    trackEvent('filter_clicks', { category });
  };

  return (
    <Card className="transactions-card">
      <div className="table-header">
        <h3>Recent Transactions</h3>
        <button className="filter-btn" onClick={() => handleFilterClick('all')}>
          <Filter size={16} />
          Filter
        </button>
      </div>
      
      <div className="table-container">
        <div className="table-head">
          <div className="cell">Date</div>
          <div className="cell">Merchant</div>
          <div className="cell">Category</div>
          <div className="cell">Amount</div>
          <div className="cell">Status</div>
          <div className="cell"></div>
        </div>
        
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found matching your search.</p>
          </div>
        ) : (
          <div className="table-body">
            {transactions.map((tx) => (
              <div key={tx.id} className="transaction-row animate-fade-in">
                <div className="cell date-cell">{tx.date}</div>
                <div className="cell merchant-cell">{tx.merchant}</div>
                <div className="cell">
                  <span className="category-tag">{tx.category}</span>
                </div>
                <div className={`cell amount-cell ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </div>
                <div className="cell">
                  <span className={`status-pill ${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </div>
                <div className="cell action-cell">
                  <ChevronRight size={16} className="chevron" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .empty-state {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .transactions-card {
          grid-column: span 12;
        }
        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.75rem;
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--text-secondary);
          border: 1px solid var(--border-primary);
          transition: var(--transition-base);
          cursor: pointer;
        }
        .filter-btn:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .table-container {
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
        }
        .table-head {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 40px;
          padding: 1rem;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-primary);
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .table-body {
          max-height: 400px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--border-primary) transparent;
        }
        .transaction-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 40px;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border-primary);
          background: var(--bg-secondary);
          transition: var(--transition-base);
        }
        .transaction-row:hover {
          background: var(--bg-surface);
        }
        .transaction-row:last-child {
          border-bottom: none;
        }
        .cell {
          font-size: 0.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .merchant-cell {
          font-weight: 500;
          color: var(--text-primary);
        }
        .category-tag {
          padding: 0.25rem 0.5rem;
          background: var(--bg-surface);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .amount-cell {
          font-weight: 600;
        }
        .amount-cell.positive { color: var(--accent-primary); }
        .amount-cell.negative { color: var(--text-primary); }
        
        .status-pill {
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
        }
        .status-pill.completed { background: rgba(63, 185, 80, 0.1); color: var(--accent-primary); }
        .status-pill.pending { background: rgba(210, 153, 34, 0.1); color: var(--warning); }
        
        .chevron { color: var(--text-muted); cursor: pointer; }
      `}} />
    </Card>
  );
};
