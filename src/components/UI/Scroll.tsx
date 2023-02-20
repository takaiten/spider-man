import React, { useState, useEffect, memo, useRef } from 'react';
import { useScene } from 'babylonjs-hook';
import styles from './Scroll.module.css';

const Scroll = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const scene = useScene();

  useEffect(() => {
    const animGroup = scene?.getAnimationGroupByName('cameraAnimations') ?? null;
    const handleScroll = () => {
      if (!animGroup) return;
      const percent = window.scrollY / (document.body.clientHeight - window.innerHeight);
      animGroup.goToFrame(percent * animGroup.to);
      animGroup.play();
      animGroup.pause();
      if (!ref.current) return;
      ref.current.style.setProperty('--progress', `${percent * 100}%`);
    };
    window.addEventListener('scroll', handleScroll, false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scene]);

  return (
    <div ref={ref} className={styles.scrollbar}>
      <div className={styles.scrollbarLine} />
      <div className={styles.scrollbarCircle} />
    </div>
  );
});
Scroll.displayName = 'Scroll';

export default Scroll;
