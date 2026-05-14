import React from 'react';

const StatsCard = ({ number, label, color, className = '' }) => (
  <div className={`stat-card ${className}`}>
    <div className={`text-xl md:text-2xl lg:text-3xl font-bold text-${color}`}>{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default StatsCard;
