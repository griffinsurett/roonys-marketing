// src/components/inputs/input.jsx
import React from 'react';

/**
 * TextInput wraps a standard `<input>` with consistent styling.
 * Props:
 *  - label: string (also used as placeholder and aria-label)
 *  - name: string
 *  - value: string
 *  - onChange: fn
 *  - type: string (default: "text")
 *  - required: bool
 *  - className: string (extra wrapper classes)
 */
const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  className = '',
  ...props
}) => (
  <div className={`mb-4 ${className}`}>
    <input
      type={type}
      name={name}
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

export default TextInput;
