'use client';

import React, { useEffect, memo, useRef } from 'react';
import styles from './Scroll.module.css';

const Scroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const percent = window.scrollY / (document.body.clientHeight - window.innerHeight);
      ref.current.style.setProperty('--progress', `${percent * 100}%`);
    };
    window.addEventListener('scroll', handleScroll, false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className={styles.scrollbar}>
      <div className={styles.scrollbarLine} />
      <div className={styles.scrollbarCircle} />
    </div>
  );
};

export default memo(Scroll);
