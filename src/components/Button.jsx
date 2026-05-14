const Button = ({
  variant = 'primary',
  href,
  className = '',
  icon,
  children,
  ...props
}) => {
  const baseClasses =
    'w-full sm:w-auto justify-center px-12 cursor-pointer py-5 rounded-full font-black text-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-2xl uppercase border-4';
  const variants = {
    primary: 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 border-transparent',
    secondary: 'border-white text-white hover:bg-white hover:text-gray-900 bg-transparent',
  };
  const variantClasses = variants[variant] || variants.primary;
  const allClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={allClasses} {...props}>
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <button className={allClasses} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  );
};

export default Button;
