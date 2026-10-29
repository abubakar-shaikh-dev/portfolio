'use client';

import { useEffect, useRef } from 'react';

const CONFETTI_COLORS = ['#10b981', '#34d399', '#ffffff', '#6b7280'];
const HOTSPOT_X = 3;
const HOTSPOT_Y = 4;

/**
 * Site-wide custom cursor: a paper plane that trails the pointer with a
 * soft lerp, tilts into the direction of travel, presses down on click
 * and emits a minimal confetti burst. Native cursor is hidden only while
 * this component is attached (no-JS keeps the CSS SVG cursor fallback).
 * Skipped entirely on touch-only devices and honors reduced motion.
 */
export function CustomCursor() {
  const planeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    const plane = planeRef.current;
    const trail = trailRef.current;
    const fx = fxRef.current;
    if (!plane || !fx) return;

    root.classList.add('custom-cursor-attached');

    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let trailX = targetX;
    let trailY = targetY;
    let scale = 1;
    let pressed = false;
    let shown = false;
    let frame = 0;

    const spawnConfetti = (cx: number, cy: number) => {
      if (reducedMotion) return;
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('span');
        const size = 3 + Math.random() * 3;
        const round = Math.random() < 0.35;
        particle.style.cssText =
          `position:absolute;left:0;top:0;width:${size}px;height:${round ? size : size * 1.7}px;` +
          `background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};` +
          `border-radius:${round ? '50%' : '1px'};`;
        fx.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 26;
        const driftX = Math.cos(angle) * distance;
        const driftY = Math.sin(angle) * distance - 8;

        particle.animate(
          [
            { transform: `translate(${cx}px, ${cy}px) rotate(0deg) scale(1)`, opacity: 1 },
            {
              transform: `translate(${cx + driftX}px, ${cy + driftY}px) rotate(${Math.random() * 260 - 130}deg) scale(0.3)`,
              opacity: 0,
            },
          ],
          { duration: 480 + Math.random() * 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' },
        ).onfinish = () => particle.remove();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!shown) {
        x = targetX;
        y = targetY;
        trailX = x;
        trailY = y;
        shown = true;
        plane.style.opacity = '1';
      }
    };

    const spawnRipple = (cx: number, cy: number) => {
      if (reducedMotion || !fx) return;
      const ripple = document.createElement('span');
      ripple.style.cssText =
        'position:absolute;left:-22px;top:-22px;width:44px;height:44px;border:1.5px solid rgba(16,185,129,0.55);border-radius:50%;';
      fx.appendChild(ripple);
      ripple.animate(
        [
          { transform: `translate(${cx}px, ${cy}px) scale(0.35)`, opacity: 0.9 },
          { transform: `translate(${cx}px, ${cy}px) scale(1.6)`, opacity: 0 },
        ],
        { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      ).onfinish = () => ripple.remove();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.button !== 0) return;
      pressed = true;
      spawnConfetti(event.clientX, event.clientY);
      spawnRipple(event.clientX, event.clientY);
    };

    const onPointerUp = () => {
      pressed = false;
    };

    const onMouseLeave = () => {
      shown = false;
      plane.style.opacity = '0';
      if (trail) trail.style.opacity = '0';
    };

    const tick = () => {
      if (reducedMotion) {
        x = targetX;
        y = targetY;
        trailX = x;
        trailY = y;
      } else {
        x += (targetX - x) * 0.22;
        y += (targetY - y) * 0.22;
        trailX += (x - trailX) * 0.09;
        trailY += (y - trailY) * 0.09;
        scale += ((pressed ? 0.78 : 1) - scale) * 0.35;
      }
      const tilt = reducedMotion ? 0 : Math.max(-14, Math.min(14, (targetX - x) * 0.55));
      plane.style.transform = `translate3d(${x - HOTSPOT_X}px, ${y - HOTSPOT_Y}px, 0) rotate(${tilt}deg) scale(${scale})`;
      if (trail && shown) {
        trail.style.opacity = '1';
        trail.style.transform = `translate3d(${trailX - 18}px, ${trailY - 18}px, 0) scale(${pressed ? 1.4 : 1})`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    root.addEventListener('mouseleave', onMouseLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      root.classList.remove('custom-cursor-attached');
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('mouseleave', onMouseLeave);
      fx.replaceChildren();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <div ref={fxRef} />
      <div
        ref={trailRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full bg-accent/25 opacity-0 blur-md will-change-transform"
      />
      <div
        ref={planeRef}
        className="absolute left-0 top-0 h-6 w-6 opacity-0 will-change-transform"
        style={{ transformOrigin: `${HOTSPOT_X}px ${HOTSPOT_Y}px` }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g transform="translate(24 0) scale(-1 1)">
            <path
              d="M19.54,3.1,3.62,10.31A1.17,1.17,0,0,0,4,12.5l6.23,1.26L11.5,20a1.17,1.17,0,0,0,2.19.39L20.9,4.46A1,1,0,0,0,19.54,3.1Z"
              fill="#FFFFFF"
              stroke="#111827"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
