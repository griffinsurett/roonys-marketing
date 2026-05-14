// src/sections/ServicesSection.jsx
import React from "react";
import ServiceCard from "../components/cards/ServicesCard";
import {
  Video,
  Scissors,
  Captions,
  BarChart2,
  CalendarDays,
  Megaphone,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import contentMarketing from "../assets/service-imgs/content-marketing.jpg";
import socialMedia from "../assets/service-imgs/socialmediamarketing.jpg";
import ads from "../assets/service-imgs/ads.jpg";
import crm from "../assets/service-imgs/email.jpg";
import webDesign from "../assets/service-imgs/digital-adv.jpg";
import digitalStrategy from "../assets/service-imgs/seo.jpg";

const services = [
  {
    icon: <Video className="w-8 h-8" />,
    title: "Reel & TikTok Production",
    description:
      "We script, shoot, and edit short-form videos built to stop the scroll — hooks that grab, stories that hold, endings that convert.",
    color: "from-pink-500 to-purple-600",
    image: contentMarketing,
  },
  {
    icon: <Scissors className="w-8 h-8" />,
    title: "Video Editing & Post",
    description:
      "Raw footage transformed into polished, platform-native cuts — captions, sound design, pacing, and effects optimized for vertical viewing.",
    color: "from-cyan-500 to-blue-600",
    image: webDesign,
  },
  {
    icon: <Captions className="w-8 h-8" />,
    title: "Hook & Script Writing",
    description:
      "Every viral video starts with a great script. We write scroll-stopping hooks and tight narratives that keep viewers watching to the end.",
    color: "from-yellow-500 to-orange-600",
    image: socialMedia,
  },
  {
    icon: <CalendarDays className="w-8 h-8" />,
    title: "Content Calendar & Posting",
    description:
      "Consistent publishing is the algorithm's best friend. We manage your content pipeline so your feed never goes quiet.",
    color: "from-green-500 to-teal-600",
    image: crm,
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: "Paid Short-Form Ads",
    description:
      "We turn your best organic reels into high-converting paid campaigns on TikTok, Instagram, and YouTube Shorts.",
    color: "from-indigo-500 to-purple-600",
    image: ads,
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    title: "Performance Analytics",
    description:
      "Retention curves, watch-through rates, saves, and shares — we track what matters and use the data to make the next video better.",
    color: "from-pink-500 to-red-600",
    image: digitalStrategy,
  },
];

const ServicesSection = () => (
  <section
    id="services"
    className="section-padding relative bg-gradient-to-br from-purple-50 to-cyan-50"
  >
    <div className="section-container relative z-10">
      <SectionHeading
        eyebrow="What We Do"
        eyebrowColor="text-[var(--color-brand-purple)]"
        before="Short-Form Content"
        highlight="That Converts"
        highlightClass="gradient-services"
        beforeClass="text-gray-800"
        titleClass="text-4xl md:text-6xl font-black uppercase"
        description="Everything you need to dominate Reels, TikToks, and Shorts — from concept to conversion."
        descriptionClass="text-xl max-w-3xl mx-auto font-medium text-gray-600"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc, i) => (
          <ServiceCard key={i} {...svc} />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
