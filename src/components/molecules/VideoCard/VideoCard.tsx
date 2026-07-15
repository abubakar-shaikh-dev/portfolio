import { Play } from 'lucide-react';
import type { Video } from '@/data/types/video.types';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-transform duration-150 ease-out-premium active:scale-98"
    >
      <div className="relative aspect-video overflow-hidden bg-bg-secondary">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center bg-accent-orange">
            <Play className="h-5 w-5 text-white" fill="white" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-white transition-colors group-hover:text-accent-orange line-clamp-2">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-text-muted">{video.date}</p>
      </div>
    </a>
  );
}
