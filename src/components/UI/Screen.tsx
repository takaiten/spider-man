'use client';

import React from 'react';
import Image from 'next/image';

import styles from './Screen.module.css';
import Scroll from './Scroll';
import ScrollHide from './ScrollHide';
import { smoothScroll } from '~/helpers/dom';

type ScreenProps = {};

const Screen: React.FC<ScreenProps> = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>
            <Image
              loading="eager"
              src="/assets/vector/hc-icon.svg"
              width={32}
              height={32}
              alt="🕷"
            />
          </span>
          <span>
            <Image loading="eager" src="/assets/vector/menu.svg" width={32} height={32} alt="+" />
          </span>
        </div>
        <ScrollHide>
          <div className={styles.logo}>
            <Image
              loading="eager"
              src="/assets/images/spiderman-logo.png"
              width={3023}
              height={386}
              alt="logo"
            />
          </div>
        </ScrollHide>
        <div>
          <button onClick={() => smoothScroll(3555, 6000)} className={styles.button}>
            Buy tickets
          </button>
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
