import { motion } from 'framer-motion';
import { VideoCard } from '@/components/VideoCard';
import { videos } from '@/data/videos';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function VideosGridSection() {
  return (
    <section className="pb-20">
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {videos.map((video) => (
            <motion.div key={video.id} variants={itemVariants}>
              <VideoCard video={video} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
