/**
 * Rectangle component renders a div with customizable width, height, bg color
 * Props:
 *  - className: Tailwind classes to control width, height, color, position, etc.
 */
const Rectangle = ({ className = '', ...props }) => (
  <div
    className={`${className}`}
    {...props}
  />
);

export default Rectangle;