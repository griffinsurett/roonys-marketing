import { socialLinks } from './SocialLinks';

const SocialRail = () => (
  <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-5">
    {socialLinks.map(({ href, Icon, label }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        className="text-white/70 hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg"
      >
        <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
      </a>
    ))}
  </div>
);

export default SocialRail;
