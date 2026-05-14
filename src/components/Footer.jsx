import Logo from './Logo';
import { siteData } from '../content/siteData';
import { socialLinks } from './SocialLinks';

const Footer = () => (
  <footer
    className="relative overflow-hidden"
    style={{ background: 'linear-gradient(to bottom right, #ec4899, #9333ea, #4c1d95)' }}
  >

    <div className="section-container pt-20 pb-0 relative z-10">

      {/* Centered logo + about */}
      <div className="flex flex-col items-center text-center gap-6 pb-14 border-b border-white/20">
        <Logo className="w-60 h-60" />
        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
          {siteData.tagline}
        </p>
        <div className="flex gap-6">
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

      {/* Bottom bar: copyright left, legal links right */}
      <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
        <span>© {new Date().getFullYear()} {siteData.fullName}.</span>
        <div className="flex gap-6">
          <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>

    </div>

    {/* Giant wordmark bleeding off bottom */}
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
