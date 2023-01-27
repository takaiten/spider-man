import React from 'react';
import styles from './HeadsUpDisplay.module.css';

type HUDProps = {};

const HUD: React.FC<HUDProps> = () => {
  return (
    <div className={styles.hudContainer}>
      <div className={styles.header}>
        <div>
          <span>🕸</span>&nbsp;
          <span>menu</span>
        </div>
        <div>
          <button className={styles.button}>Buy tickets</button>
        </div>
      </div>
      <div className={styles.fill} />
      <div className={styles.footer}>
        <span>Marvel</span>
        <span>Sony</span>
      </div>
    </div>
  );
};

export default HUD;
