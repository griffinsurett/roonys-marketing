import { Star } from 'lucide-react';

const TestimonialCard = ({ name, company, text, rating, className = '' }) => (
  <div className={`relative ${className}`}>
    <div className="content-card p-8 h-full">
      <div className="flex space-x-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">"{text}"</p>
      <div className="border-t border-gray-200 pt-4">
        <div className="font-semibold text-gray-800">{name}</div>
        <div className="text-gray-600">{company}</div>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-2xl blur-xl -z-10" />
  </div>
);

export default TestimonialCard;
