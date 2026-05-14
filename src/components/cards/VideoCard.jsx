import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoCard = ({
  videoUrl,
  thumbnail,
  title,
  color
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const showOverlay = (thumbnail || !videoUrl) && !isPlaying;

  return (
    <div className="group relative w-full h-full">
      {/* Video container - fills parent completely */}
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gray-900">
        {showOverlay ? (
          <>
            {thumbnail
              ? <img src={thumbnail} alt={title} className="w-full h-full object-cover object-center" />
              : <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
            }
            {/* Play Button Overlay */}
            <div
              className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors cursor-pointer"
              onClick={() => videoUrl && setIsPlaying(true)}
            >
              <div className={`bg-gradient-to-r ${color} p-3 md:p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform`}>
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-0.5" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Direct video embed - no thumbnail */}
            <iframe
              src={`${videoUrl}?rel=0&modestbranding=1${!thumbnail ? '&autoplay=0&mute=1' : ''}`}
              title={title}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            
            {/* Close button when playing from thumbnail */}
            {thumbnail && isPlaying && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(false);
                }}
                className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </>
        )}
      </div>
      
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}/>
    </div>
  );
};

export default VideoCard;