import React from 'react';
import styles from './Screen.module.css';

type ScreenProps = {};

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
      <div className={styles.content} />
      <footer className={styles.footer}>
        <span>Marvel</span>
        <span>Sony</span>
      </footer>
    </div>
  );
};

export default Screen;
