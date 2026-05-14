// src/components/inputs/textarea.jsx
import React from 'react';

/**
 * TextArea wraps a standard `<textarea>` with consistent styling.
 * Props:
 *  - label: string (also used as placeholder and aria-label)
 *  - name: string
 *  - value: string
 *  - onChange: fn
 *  - rows: number (default: 4)
 *  - required: bool
 *  - className: string (extra wrapper classes)
 */
const TextArea = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  required = false,
  className = '',
  ...props
}) => (
  <div className={`mb-6 ${className}`}>
    <textarea
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={label}
      aria-label={label}
      className="input"
      {...props}
    />
  </div>
);

export default TextArea;
