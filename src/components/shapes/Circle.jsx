// src/components/shapes/Circle.jsx
/**
 * Circle component renders a div with rounded-full
 * Props:
 *  - className: additional Tailwind classes to control size, position, color, etc.
 */
const Circle = ({ className = '', ...props }) => (
  <div
    className={`rounded-full ${className}`}
    {...props}
  />
);

export default Circle;