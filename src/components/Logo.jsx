import RoonyLogo from '../assets/roony-logo.png';

const Logo = ({ src = RoonyLogo, alt = "Roony's Logo", className = "w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15", ...props }) => {
  const resolvedSrc = typeof src === 'object' && src?.src ? src.src : src;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default Logo;
