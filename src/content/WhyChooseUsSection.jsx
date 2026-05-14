import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import rsdImage from '../assets/service-imgs/seo.jpg';

const facts = [
  { stat: '100+', label: 'Happy Clients',       body: 'Over 100 businesses trust us to handle their digital presence — from local shops to growing brands.' },
  { stat: '250%', label: 'Average Growth',       body: 'Our clients see an average 250% increase in engagement and leads within the first 90 days.' },
  { stat: '5+',   label: 'Years of Experience',  body: 'Half a decade of hands-on digital marketing across social media, paid ads, SEO, and web development.' },
  { stat: '3x',   label: 'ROI Delivered',        body: 'We don\'t just run campaigns — we build systems that reliably return at least 3x your ad spend.' },
  { stat: '24/7', label: 'Always On',            body: 'Our team monitors every campaign around the clock so you\'re never leaving money on the table.' },
];

const WhyChooseUsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="why-us" className="section-padding relative bg-white">
      <div className="section-container">

        <SectionHeading
          eyebrow="Why Choose Us"
          eyebrowColor="text-blue-600"
          highlight="The Roony"
          after="Difference"
          highlightClass="gradient-about"
          afterClass="text-gray-800"
          titleClass="text-4xl md:text-6xl font-black uppercase"
          description="We don't do cookie-cutter marketing. Every strategy is built around your business goals."
          descriptionClass="text-xl max-w-3xl mx-auto font-medium text-gray-600"
        />

        {/* Slide card */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row md:h-[32rem]">

          {/* Left — gradient panel */}
          <div className="relative w-full md:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-pink-400 p-8 flex flex-col justify-center overflow-hidden min-h-[320px]">
            <img src="/roony-logo.svg" alt="" aria-hidden="true"
              className="absolute inset-0 m-auto w-80 opacity-[0.15] pointer-events-none select-none" />
            <div className="relative z-10">
              <div className="text-7xl md:text-8xl font-black leading-none text-yellow-400">
                {facts[active].stat}
              </div>
              <div className="text-2xl font-black text-white mt-3 uppercase tracking-wide">
                {facts[active].label}
              </div>
              <p className="text-white/80 mt-4 text-base leading-relaxed max-w-xs">
                {facts[active].body}
              </p>
            </div>
          </div>

          {/* Right — RSD photo */}
          <div className="relative w-full md:w-1/2 min-h-[260px]">
            <img src={rsdImage} alt="Results driven strategy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-1">Real Strategy. Real Data.</div>
              <div className="text-xl font-black uppercase text-white">Results Driven.</div>
            </div>
          </div>

        </div>

        {/* Dots + nav — centered below card */}
        <div className="flex justify-center items-center gap-4 mt-5">
          <button
            onClick={() => setActive(i => (i - 1 + facts.length) % facts.length)}
            className="w-9 h-9 rounded-full border-2 border-gray-300 text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center font-bold text-sm"
          >←</button>
          <div className="flex items-center gap-2">
            {facts.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-7 h-3 bg-gradient-to-r from-purple-600 to-pink-500' : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActive(i => (i + 1) % facts.length)}
            className="w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center font-bold text-sm"
          >→</button>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
