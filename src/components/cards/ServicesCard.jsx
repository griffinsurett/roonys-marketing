const ServiceCard = ({ title, description, color, image, className = '' }) => (
  <div className={`group relative ${className}`}>
    <div className="content-card hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-2 h-full hover:shadow-xl overflow-hidden">
      {image && (
        <div className="w-full h-44 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
    <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}/>
  </div>
);

export default ServiceCard;
