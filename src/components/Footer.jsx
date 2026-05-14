import Logo from './Logo';
import { siteData } from '../content/siteData';
import { socialLinks } from './SocialLinks';

const footerLinks = {
  Services: [
    { label: 'Short-Form Video',  href: '#services' },
    { label: 'Reels & TikToks',   href: '#services' },
    { label: 'YouTube Shorts',    href: '#services' },
    { label: 'Paid Ad Creative',  href: '#services' },
  ],
  Company: [
    { label: 'Our Work',    href: '#portfolio' },
    { label: 'About',       href: '#home' },
    { label: 'Contact',     href: '#contact' },
  ],
};

const Footer = () => (
  <footer
    className="relative overflow-hidden"
    style={{ background: 'linear-gradient(to bottom right, #9333ea, #ec4899, #f97316)' }}
  >
    <div className="section-container pt-20 pb-0 relative z-10">

      {/* Top row: logo+social left, link columns right */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 pb-16 border-b border-white/20">

        {/* Left: logo + tagline + socials */}
        <div className="flex flex-col gap-6 lg:max-w-xs">
          <Logo className="w-20 h-20" />
          <p className="text-white/70 text-sm leading-relaxed">
            {siteData.tagline}
          </p>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Social</p>
            <div className="flex gap-5">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: link columns */}
        <div className="flex flex-wrap gap-12 lg:gap-20 lg:ml-auto">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{group}</p>
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/80 hover:text-white text-sm transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* Copyright */}
      <div className="py-6 text-white/40 text-xs text-center lg:text-left">
        © {new Date().getFullYear()} {siteData.fullName}. Built by{' '}
        <a href="https://griffinswebservices.com" className="hover:text-white transition-colors">
          Griffin's Web Services
        </a>
      </div>

    </div>

    {/* Giant wordmark — bleeds off the bottom like Discord */}
    <div
      className="w-full overflow-hidden leading-none select-none pointer-events-none"
      aria-hidden="true"
      style={{ marginBottom: '-0.15em' }}
    >
      <p
        className="text-center font-black uppercase tracking-tight whitespace-nowrap"
        style={{
          fontSize: 'clamp(5rem, 18vw, 22rem)',
          color: 'rgba(255,255,255,0.12)',
          lineHeight: 1,
        }}
      >
        ROONY'S
      </p>
    </div>

  </footer>
);

export default Footer;
