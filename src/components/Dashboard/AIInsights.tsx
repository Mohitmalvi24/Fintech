import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../UI/Card';
import { useAnalytics } from '../../hooks';

interface Insight {
  id: string;
  type: string;
  title: string;
  description: string;
  impact: string;
}

export const AIInsights: React.FC<{ insights: Insight[] }> = React.memo(({ insights }) => {
  const { trackEvent } = useAnalytics();

  return (
    <Card title="Curator's Pro Intelligence" className="insights-card">
      <div className="insights-list">
        {insights.length === 0 ? (
          <p className="empty-insights">No insights available at this time.</p>
        ) : (
          insights.map((insight) => (
            <div key={insight.id} className="insight-item">
              <div className="insight-banner">
                <div className="banner-icon">
                  <Sparkles size={20} />
                </div>
                <div className="banner-content">
                  <div className="insight-header">
                    <span className="impact-tag">{insight.impact} Priority</span>
                  </div>
                  <h4 className="insight-title">{insight.title}</h4>
                  <p className="insight-desc">{insight.description}</p>
                </div>
              </div>
              <button 
                className="insight-cta"
                onClick={() => trackEvent('execute_strategy', { insightId: insight.id })}
              >
                Implement Strategy <ArrowRight size={14} />
              </button>
            </div>
          ))
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .insights-card {
          border: none;
          background: transparent !important;
          padding: 0 !important;
        }
        .insights-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .insight-item {
          background: var(--accent-primary);
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 1.5rem;
          color: white;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
          position: relative;
        }
        .insight-item::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .insight-banner {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .banner-icon {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .impact-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .insight-title {
          font-size: 1.25rem;
          margin: 0.5rem 0 0.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .insight-desc {
          font-size: 0.95rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        .insight-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          justify-content: center;
          width: 100%;
          transition: var(--transition-base);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .insight-cta:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .empty-insights {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-align: center;
          padding: 2rem 0;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
        }
      `}} />
    </Card>
  );
});
