// src/components/IconListItem.jsx
import React from 'react';

/**
 * IconListItem renders an icon alongside text in a horizontal layout.
 * Props:
 *  - icon: React node (the icon component with its classes)
 *  - text: string (the label to display)
 *  - className: additional Tailwind classes for the wrapper
 */
const IconListItem = ({ icon, text, className = '' }) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    {icon}
    <span className="text-gray-700">{text}</span>
  </div>
);

export default IconListItem;