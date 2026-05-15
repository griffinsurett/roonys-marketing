import { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoCard = ({ videoUrl, thumbnail, title, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbSrc = thumbnail && typeof thumbnail === 'object' ? thumbnail.src : thumbnail;
  const videoSrc = videoUrl && typeof videoUrl === 'object' ? videoUrl.src : videoUrl;

  return (
    <div className="group relative w-full h-full">
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-900">
        {isPlaying ? (
          <>
            <video
              src={videoSrc}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              controls
              playsInline
            />
            <button
              onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            {thumbSrc
              ? <img src={thumbSrc} alt={title} className="w-full h-full object-cover object-center" />
              : <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
            }
            <div
              className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors cursor-pointer"
              onClick={() => videoSrc && setIsPlaying(true)}
            >
              <div className={`bg-gradient-to-r ${color} p-3 md:p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform`}>
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-0.5" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`} />
    </div>
  );
};

export default VideoCard;
