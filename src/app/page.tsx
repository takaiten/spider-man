import { memo } from 'react';

import styles from './page.module.css';

import Background from '~/components/UI/Background';
import Screen from '~/components/UI/Screen';
import Scene from '~/components/3D/MainScene';
import Text from '~/components/UI/Text';

const Home = () => {
  return (
    <main className={styles.main}>
      <Background />
      <Text />
      <Scene />
      <Screen />
    </main>
  );
};

export default memo(Home);
