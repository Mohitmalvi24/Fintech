import React, { useState } from 'react';
import { Search, Bell, Command } from 'lucide-react';
import { useDebounce, useAnalytics } from '../../hooks';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { trackEvent } = useAnalytics();

  React.useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
      trackEvent('search_usage', { query: debouncedQuery });
    }
  }, [debouncedQuery]);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">Executive Overview</h1>
      </div>

      <div className="header-center">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search accounts, transactions, or commands..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-hint">
            <Command size={12} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .header {
          height: 80px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          background: rgba(11, 17, 32, 0.85);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 900;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }
        .search-container {
          position: relative;
          width: 460px;
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 0.6rem 1rem;
          border: 1px solid var(--border-primary);
          transition: var(--transition-base);
        }
        .search-container:focus-within {
          border-color: var(--accent-primary);
          background: var(--bg-surface);
        }
        .search-icon {
          color: var(--text-muted);
          margin-right: 0.75rem;
        }
        .search-container input {
          background: none;
          border: none;
          color: var(--text-primary);
          width: 100%;
          outline: none;
          font-size: 0.9rem;
          font-family: inherit;
        }
        .search-hint {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 2px 6px;
          background: var(--bg-surface);
          border: 1px solid var(--border-primary);
          border-radius: 4px;
          color: var(--text-muted);
          font-size: 0.7rem;
          font-weight: 600;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .icon-btn {
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          position: relative;
        }
        .icon-btn:hover {
          background: var(--bg-surface);
          color: var(--text-primary);
        }
        .badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          border: 2px solid var(--bg-secondary);
        }
      `}} />
    </header>
  );
};
