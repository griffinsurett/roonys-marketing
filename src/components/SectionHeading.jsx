import SectionEyebrow from './SectionEyebrow';

/**
 * Reusable section heading block.
 * Props:
 *  - eyebrow: string
 *  - eyebrowColor: tailwind text color class (default: 'text-yellow-400')
 *  - before: string — plain text before the highlighted word
 *  - highlight: string — the gradient/colored word(s)
 *  - after: string — plain text after the highlighted word
 *  - highlightClass: tailwind classes for the highlight span (default: gradient-services)
 *  - beforeClass: tailwind classes for before span
 *  - afterClass: tailwind classes for after span
 *  - titleClass: tailwind classes on the h2
 *  - description: string
 *  - descriptionClass: tailwind classes for the description
 *  - className: extra classes for the wrapper div
 */
const alignClass = { left: 'text-left items-start', center: 'text-center items-center', right: 'text-right items-end' };

const SectionHeading = ({
  eyebrow,
  eyebrowColor,
  before,
  highlight,
  after,
  highlightClass = 'gradient-services',
  beforeClass = 'text-gray-800',
  afterClass = 'text-gray-800',
  titleClass = 'text-4xl md:text-6xl font-black uppercase',
  description,
  descriptionClass = 'text-xl max-w-3xl mx-auto font-medium text-white/90',
  align = 'center',
  className = '',
}) => (
  <div className={`section-header flex flex-col ${alignClass[align]} ${className}`}>
    {eyebrow && <SectionEyebrow label={eyebrow} color={eyebrowColor} align={align} />}
    <h2 className={titleClass}>
      {before && <span className={beforeClass}>{before} </span>}
      {highlight && <span className={highlightClass}>{highlight}</span>}
      {after && <span className={afterClass}> {after}</span>}
    </h2>
    {description && <p className={descriptionClass}>{description}</p>}
  </div>
);

export default SectionHeading;
