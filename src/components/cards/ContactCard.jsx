import React from 'react';

const ContactCard = ({ icon, title, info, linkPrefix = '', className = '' }) => {
  const href = linkPrefix ? `${linkPrefix}${info}` : undefined;

  // If href is present, wrap in <a>, otherwise just a <div>
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? { href, target: linkPrefix.startsWith('http') ? '_blank' : undefined }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`contact-card block hover:shadow-xl transition-shadow ${className}`}
    >
      {icon}
      <div className="text-white font-bold text-lg">{title}</div>
      <div className="text-white/90">{info}</div>
    </Wrapper>
  );
};

export default ContactCard;
