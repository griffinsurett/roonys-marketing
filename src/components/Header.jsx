import Logo from './Logo';

const Header = () => (
  <nav className="flex justify-center">
    <a href="#home">
      <Logo className="w-36 h-36 drop-shadow-xl" />
    </a>
  </nav>
);

export default Header;
