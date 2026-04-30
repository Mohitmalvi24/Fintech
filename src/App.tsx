import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { SummaryCards } from './components/Dashboard/SummaryCards';
import { AIInsights } from './components/Dashboard/AIInsights';
import { Alerts } from './components/Dashboard/Alerts';
import { BudgetIntelligence } from './components/Dashboard/BudgetIntelligence';
import { ErrorBoundary } from './components/ErrorBoundary';
// import { TransactionsTable } from './components/Dashboard/TransactionsTable';
// import { SpendingChart } from './components/Dashboard/SpendingChart';
import { useFetch, useLocalStorage, useAnalytics } from './hooks';
import mockData from './services/mockData.json';
import { BudgetPage } from './components/Dashboard/BudgetPage';
import { generateDynamicInsights } from './utils/ai-insights';

// Performance: Lazy loading heavy components
const SpendingChart = React.lazy(() => import('./components/Dashboard/SpendingChart').then(m => ({ default: m.SpendingChart })));
const TransactionsTable = React.lazy(() => import('./components/Dashboard/TransactionsTable').then(m => ({ default: m.TransactionsTable })));

function App() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', 'dark');
  const [activeTab, setActiveTab] = useState('dashboard');
  const { trackEvent } = useAnalytics();
  
  // Simulated fetch
  const { data, loading, error } = useFetch(() => 
    new Promise((resolve) => setTimeout(() => resolve(mockData), 1000))
  );

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    trackEvent('page_load', { theme });
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const dynamicInsights = useMemo(() => {
    if (!data) return [];
    return generateDynamicInsights((data as any).transactions);
  }, [data]);

  const filteredTransactions = useMemo(() => {
    if (!data) return [];
    const query = searchQuery.toLowerCase();
    return (data as any).transactions.filter((tx: any) => 
      tx.merchant.toLowerCase().includes(query) || 
      tx.category.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '1rem' }}>
        <div className="loader"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Curating your wealth data...</p>
        <style>{`
          .loader {
            width: 48px;
            height: 48px;
            border: 5px solid var(--bg-surface);
            border-bottom-color: var(--accent-primary);
            border-radius: 50%;
            animation: rotation 1s linear infinite;
          }
          @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-center" style={{ height: '100vh', color: 'var(--error)' }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  const dashboardData = data as any;

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="main-content">
        <Header onSearch={handleSearch} />
        
        <div className="dashboard-content">
          {activeTab === 'dashboard' ? (
            <div className="grid-layout">
              {/* Top Section: Summary */}
              <section className="col-span-12 animate-fade-in">
                <ErrorBoundary>
                  <SummaryCards data={dashboardData.summary} />
                </ErrorBoundary>
              </section>

              {/* Middle Section: 70/30 Split */}
              <section className="col-span-8 animate-fade-in">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <ErrorBoundary>
                    <AIInsights insights={dynamicInsights} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <React.Suspense fallback={<div className="card glass-effect" style={{ height: '300px' }}>Loading Chart...</div>}>
                      <SpendingChart data={dashboardData.spendingData} />
                    </React.Suspense>
                  </ErrorBoundary>
                </div>
              </section>

              <aside className="col-span-4 animate-fade-in">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <ErrorBoundary>
                    <Alerts alerts={dashboardData.alerts} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <BudgetIntelligence budget={dashboardData.budget} />
                  </ErrorBoundary>
                </div>
              </aside>

              {/* Transactions Section */}
              <section className="col-span-12 animate-fade-in">
                <ErrorBoundary>
                  <React.Suspense fallback={<div className="card glass-effect" style={{ height: '200px' }}>Loading Transactions...</div>}>
                    <TransactionsTable transactions={filteredTransactions} />
                  </React.Suspense>
                </ErrorBoundary>
              </section>
            </div>
          ) : activeTab === 'budget' ? (
            <ErrorBoundary>
              <BudgetPage data={{ ...dashboardData.budgetData, alerts: dashboardData.alerts || [] }} />
            </ErrorBoundary>
          ) : (
            <div className="flex-center" style={{ height: '50vh' }}>
              <h2 style={{ color: 'var(--text-muted)' }}>Page coming soon...</h2>
            </div>
          )}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          display: flex;
          min-height: 100vh;
        }
        .main-content {
          flex: 1;
          margin-left: 260px;
          background: var(--bg-primary);
        }
        .dashboard-content {
          padding: 1rem 2rem 4rem;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
        }
        .col-span-12 { grid-column: span 12; }
        .col-span-8 { grid-column: span 8; }
        .col-span-4 { grid-column: span 4; }

        @media (max-width: 1024px) {
          .col-span-8, .col-span-4 { grid-column: span 12; }
          .main-content { margin-left: 0; }
          .sidebar { display: none; } /* Mobile nav should be separate */
        }
      `}} />
    </div>
  );
}

export default App;
