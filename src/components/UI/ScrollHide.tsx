import React, { useState, useEffect } from 'react';
import styles from './ScrollHide.module.css';

const ScrollHide: React.FC<React.PropsWithChildren> = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShow(false);
      } else {
        setShow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={[styles.container, show ? styles.show : styles.hide].join(' ')}>
      {props.children}
    </div>
  );
};

export default ScrollHide;
