import { Sparkles } from 'lucide-react';

/**
 * Sparkle eyebrow label used above section headings.
 * Props:
 *  - label: string
 *  - color: tailwind text color class (default: 'text-yellow-400')
 */
const justifyMap = { left: 'justify-start', center: 'justify-center', right: 'justify-end' };

const SectionEyebrow = ({ label, color = 'text-yellow-400', align = 'center' }) => (
  <div className={`flex ${justifyMap[align]} items-center space-x-3 ${color}`}>
    <Sparkles className="w-6 h-6" />
    <span className="font-semibold uppercase tracking-wider">{label}</span>
    <Sparkles className="w-6 h-6" />
  </div>
);

export default SectionEyebrow;
