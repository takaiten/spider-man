import React from 'react';
import { steelfish } from '~/helpers/font';
import styles from './Text.module.css';

type TextProps = {};

const Text: React.FC<TextProps> = () => {
  return (
    <div className={[steelfish.className, styles.container].join(' ')}>
      <h1 className={styles.background} style={{ paddingTop: '30vh' }}>
        NO WAY HOME
      </h1>
      <div className={styles.innerContainer}>
        <div className={styles.background} style={{ paddingTop: '5em' }}>
          <p>DIRECTED BY</p>
          <h3>JON WATTS</h3>
        </div>
        <div className={styles.foreground} style={{ paddingTop: '5em', float: 'right' }}>
          <p>CAST</p>
          <h3>TOM HOLLAND</h3>
          <h3>ZENDAYA</h3>
          <h3>JACOB BATALON</h3>
        </div>
        <div
          className={styles.foreground}
          style={{ paddingTop: '5em', paddingBottom: '8em', clear: 'both' }}
        >
          <p>RELEASE DAY</p>
          <h2>DEC 17, 2021</h2>
          <p>Exclusively in Movie Theaters</p>
        </div>
      </div>
    </div>
  );
};

export default Text;
