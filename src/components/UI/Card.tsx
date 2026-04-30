import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', glass = true }) => {
  return (
    <div className={`card ${glass ? 'glass-effect' : ''} ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .card {
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: var(--transition-base);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-2px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-lg);
        }
        .card-title {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .card-content {
          flex: 1;
        }
      `}} />
    </div>
  );
};
