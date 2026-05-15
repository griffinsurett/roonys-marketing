// src/sections/Contact.jsx
import React from "react";
import ContactCard from "../components/cards/ContactCard";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteData } from "./siteData";
import ContactForm from "../components/ContactForm";
import GeometricShapes from "../layouts/GeometricShapes";
import Logo from "../components/Logo";
import { socialLinks } from "../components/SocialLinks";
import SectionHeading from "../components/SectionHeading";

const contactInfo = [
  {
    icon: <Phone className="w-8 h-8 text-yellow-400 mx-auto" />,
    title: "Call Us",
    linkPrefix: "tel:",
    info: "(555) 123-4567",
    color: "yellow-600",
  },
  {
    icon: <Mail className="w-8 h-8 text-yellow-400 mx-auto" />,
    title: "Email Us",
    linkPrefix: "mailto:",
    info: "hello@chikchak.com",
    color: "orange-600",
  },
  {
    icon: <MapPin className="w-8 h-8 text-yellow-400 mx-auto" />,
    title: "Location",
    linkPrefix: "https://www.google.com/maps/search/",
    info: siteData.location,
    color: "red-500",
  },
];

const ContactSection = () => (
  <section id="contact" className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
      <GeometricShapes />
    </div>
    {/* shapes left out intentionally */}
    <div className="section-container max-w-4xl text-center relative z-10">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Contact Us"
          before="Let's"
          highlight="Work"
          after="Together"
          beforeClass="text-white"
          highlightClass="text-yellow-400"
          afterClass="text-white"
          titleClass="text-5xl md:text-7xl font-black uppercase leading-tight"
          description="Ready to stop being invisible on social? Let's build a short-form content engine that grows your brand on autopilot."
          descriptionClass="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto leading-relaxed"
        />
        <ContactForm />
        <div className="grid md:grid-cols-3 gap-6 pt-16">
          {contactInfo.map((c, i) => (
            <ContactCard
              key={i}
              icon={c.icon}
              title={c.title}
              linkPrefix={c.linkPrefix}
              info={c.info}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/20 flex flex-col items-center gap-4 text-center">
          <Logo className="w-24 h-24" />
          <div className="flex items-center gap-5">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-yellow-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-white/70">{siteData.description}</p>
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} {siteData.fullName}. All rights
            reserved. Built by{" "}
            <a
              href="https://griffinswebservices.com"
              className="text-white/80 hover:text-white underline"
            >
              Griffin's Web Services
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
