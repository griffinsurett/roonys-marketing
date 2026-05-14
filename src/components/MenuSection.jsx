import React from 'react';

/**
 * MenuSection renders a heading plus a vertical list of items.
 * Props:
 *  - label: string (section title)
 *  - items: Array<{ label: string, color: string }>
 */
const MenuSection = ({ label, items }) => (
  <div className="space-y-4">
    <h4 className="text-gray-800 font-semibold">{label}</h4>
    <div className="space-y-2 text-gray-600">
      {items.map((item, i) => (
        <div
          key={i}
          className={`hover:text-${item.color} cursor-pointer hover:text-blue-400  transition-colors`}
        >
          {item.label}
        </div>
      ))}
    </div>
  </div>
);

export default MenuSection;
