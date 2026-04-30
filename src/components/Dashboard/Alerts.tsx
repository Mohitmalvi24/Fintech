import React from 'react';
import { X, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Card } from '../UI/Card';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'error';
  message: string;
}

export const Alerts: React.FC<{ alerts: Alert[] }> = ({ alerts }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={16} color="var(--warning)" />;
      case 'error': return <AlertCircle size={16} color="var(--error)" />;
      default: return <Info size={16} color="var(--info)" />;
    }
  };

  return (
    <Card title="Active Pulse" className="alerts-card">
      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-item ${alert.type}`}>
            <div className="alert-content">
              <div className="alert-header">
                {getIcon(alert.type)}
                <span className="type-label">{alert.type.toUpperCase()}</span>
              </div>
              <p className="message">{alert.message}</p>
            </div>
            <button className="close-btn" aria-label="Close alert">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .alerts-card {
          background: transparent !important;
          border: none;
          padding: 0 !important;
        }
        .alerts-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .alert-item {
          display: flex;
          align-items: flex-start;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          border-left: 4px solid transparent;
          transition: var(--transition-base);
        }
        .alert-item.warning { border-left-color: var(--warning); }
        .alert-item.info { border-left-color: var(--info); }
        .alert-item.error { border-left-color: var(--error); }
        
        .alert-content {
          flex: 1;
        }
        .alert-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .type-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .message {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.4;
          margin: 0;
        }
        .close-btn {
          color: var(--text-muted);
          padding: 0.25rem;
          margin-left: 0.5rem;
          opacity: 0.5;
        }
        .close-btn:hover {
          opacity: 1;
          color: var(--text-primary);
        }
      `}} />
    </Card>
  );
};
