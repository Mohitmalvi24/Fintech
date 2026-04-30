import React from 'react';
import { LayoutDashboard, PieChart, Wallet, CreditCard, Settings, LogOut, Sun, Moon, Sparkles, Banknote } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'analysis', label: 'Analysis', icon: PieChart },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'budget', label: 'Budgets', icon: Banknote },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-box">
            <Sparkles size={20} color="white" />
          </div>
          <span className="logo-text">Curator</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <div className="user-profile">
          <div className="avatar">SG</div>
          <div className="user-info">
            <span className="user-name">SGI Curator</span>
            <span className="user-role">Premium Plan</span>
          </div>
          <button className="logout-btn">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: 260px;
          height: 100vh;
          background: var(--bg-primary);
          border-right: 1px solid var(--border-primary);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
        }
        .sidebar-header {
          padding: 2rem 1.5rem;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logo-box {
          width: 36px;
          height: 36px;
          background: var(--accent-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .logo-text {
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .sidebar-nav {
          flex: 1;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          color: var(--text-secondary);
          font-weight: 500;
          transition: var(--transition-base);
          width: 100%;
          text-align: left;
        }
        .nav-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .nav-item.active {
          background: var(--accent-primary);
          color: white;
        }
        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border-primary);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .theme-toggle-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
          width: 100%;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .avatar {
          width: 32px;
          height: 32px;
          background: var(--accent-secondary);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.75rem;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .user-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-role {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .logout-btn {
          color: var(--text-muted);
          padding: 0.25rem;
        }
        .logout-btn:hover {
          color: var(--error);
        }
      `}} />
    </aside>
  );
};
