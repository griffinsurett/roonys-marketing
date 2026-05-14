/**
 * Triangle component uses borders to create a triangle shape
 * Props:
 *  - direction: 'up' | 'down' | 'left' | 'right' (default: 'up')
 *  - className: Tailwind classes for sizing, color, position, etc.
 */
const Triangle = ({ direction = 'up', className = '', ...props }) => {
  let baseClasses = '';
  switch (direction) {
    case 'up':
      baseClasses = 'border-l-transparent border-r-transparent border-b-current';
      break;
    case 'down':
      baseClasses = 'border-l-transparent border-r-transparent border-t-current';
      break;
    case 'left':
      baseClasses = 'border-t-transparent border-b-transparent border-r-current';
      break;
    case 'right':
      baseClasses = 'border-t-transparent border-b-transparent border-l-current';
      break;
    default:
      baseClasses = 'border-l-transparent border-r-transparent border-b-current';
  }
  return (
    <div
      className={`w-0 h-0 ${baseClasses} ${className}`}
      {...props}
    />
  );
};

export default Triangle;
