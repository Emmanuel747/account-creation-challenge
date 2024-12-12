import React from 'react';
import './RequirementIndicator.css';

interface RequirementIndicatorProps {
  met: boolean;
  label: string;
  ariaLabel: string;
}

const RequirementIndicator: React.FC<RequirementIndicatorProps> = ({ met, label, ariaLabel }) => (
  <div className="requirement-item" aria-label={ariaLabel}>
    <div className={`requirement-checkbox ${met ? 'met' : ''}`}>
      <span className="checkbox-icon">{met ? '✓' : '×'}</span>
    </div>
    <span className={`requirement-label ${met ? 'met' : ''}`}>{label}</span>
  </div>
);

export default RequirementIndicator;
