import Logo from './Logo';

const Footer = () => (
  <footer
    className="relative overflow-hidden"
    style={{ background: 'linear-gradient(to bottom right, #ec4899, #9333ea, #4c1d95)' }}
  >

    <div className="section-container pt-20 pb-0 relative z-10">

      {/* Centered logo + about */}
      <div className="flex flex-col items-center text-center gap-6 pb-14">
        <Logo className="w-60 h-60" />
        <p className="text-white/80 text-base leading-relaxed max-w-xl">
          We're the short-form specialists that full-service agencies call when a client brief demands Reels, TikToks, or Shorts that actually convert. White-label ready and NDA-friendly — we slot invisibly into your workflow so you can deliver scroll-stopping vertical video without building the capability in-house.
        </p>
        <p className="text-white/60 text-sm leading-relaxed max-w-xl">
          Short-form content is all we do. That singular focus means we stay ahead of every algorithm shift, hook format, and platform trend — so your clients get content built to perform, not just to post.
        </p>
        <div className="flex gap-6 text-white/40 text-xs">
          <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>

      <div className="pb-6" />

    </div>

    {/* Copyright bar */}
    <div className="section-container pb-4 relative z-10">
      <p className="text-white/30 text-sm uppercase font-black tracking-widest">
        © CHIK CHAK
      </p>
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
          fontSize: 'clamp(3rem, 15vw, 22rem)',
          color: 'rgba(255,255,255,0.12)',
          lineHeight: 1,
        }}
      >
        CHIK CHAK
      </p>
    </div>

  </footer>
);

export default Footer;
