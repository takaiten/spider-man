'use client';

import React, { useEffect, useRef } from 'react';
import style from './Background.module.css';

const Background: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const percent =
          -ref.current.getBoundingClientRect().y / (ref.current.offsetHeight - window.innerHeight);
        ref.current.style.setProperty('--parallax-y', `${percent * 100}%`);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className={style.bgContainer}>
      <div className={style.bgImage} />
    </div>
  );
};

export default Background;
