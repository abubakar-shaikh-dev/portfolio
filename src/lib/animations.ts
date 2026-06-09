import type { Transition } from 'framer-motion';

export const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: customEase,
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};
