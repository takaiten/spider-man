'use client';

import React, { memo, useEffect, useState } from 'react';
import { useScene } from 'babylonjs-hook';
import styles from './Screen.module.css';

type ScreenProps = {};

type ScrollProps = {
  start?: number;
  speed?: number;
};

const Scroll = memo<ScrollProps>(({ start = 1, speed = 0.1 }) => {
  const [frame, setFrame] = useState(start);
  const [lastFrame, setLastFrame] = useState(start);
  const scene = useScene();

  useEffect(() => {
    const animGroup = scene?.getAnimationGroupByName('cameraAnimations');
    if (!animGroup) return;
    setLastFrame(animGroup.to);
    const handleScroll = (event: WheelEvent) => {
      setFrame((prev) => {
        const value = Math.max(start, Math.min(prev + event.deltaY * speed, animGroup.to));
        animGroup.goToFrame(value);
        animGroup.play();
        animGroup.pause();
        return value;
      });
    };

    window.addEventListener('wheel', handleScroll, { capture: false });
    () => window.removeEventListener('wheel', handleScroll);
  }, [scene, setFrame]);

  return (
    <div className={styles.scrollbar}>
      <div className={styles.scrollbarLine} />
      <div className={styles.scrollbarCircle} style={{ top: `${(frame / lastFrame) * 100}%` }} />
    </div>
  );
});
Scroll.displayName = 'Scroll';

const Screen: React.FC<ScreenProps> = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <span>🕸</span>&nbsp;
          <span>menu</span>
        </div>
        <div>
          <button className={styles.button}>Buy tickets</button>
        </div>
      </header>
      <div className={styles.content}>
        <Scroll />
      </div>
      <footer className={styles.footer}>
        <span>Marvel Studio</span>
        <span>Sony Pictures ©</span>
      </footer>
    </div>
  );
};

export default Screen;
