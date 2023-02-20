import React, { useState, useEffect, memo } from 'react';
import { useScene } from 'babylonjs-hook';
import styles from './Scroll.module.css';

type ScrollProps = {
  start?: number;
  speed?: number;
};

// TODO: investigate other browsers, chrome does not work as intended
// One solution I think of is to use scroll progress from background component
const Scroll = memo<ScrollProps>(({ start = 1, speed = 0.25 }) => {
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

export default Scroll;
