import videosJson from '@/data/json/videos.json';
import type { Video } from '@/data/types/video.types';

export async function getAllVideos(): Promise<Video[]> {
  return videosJson as Video[];
}
