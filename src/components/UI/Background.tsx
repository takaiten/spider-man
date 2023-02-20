'use client';

import React, { useEffect, useRef } from 'react';
import style from './Background.module.css';

const Background: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const percent = window.scrollY / (document.body.clientHeight - window.innerHeight);
        ref.current.style.setProperty('--parallax-y', `${percent * 100}%`);
      }
    };
    window.addEventListener('scroll', handleScroll, false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div ref={ref} className={style.bgImage} />;
};

export default Background;
