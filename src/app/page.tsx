import styles from './page.module.css';

import Screen from '~/components/UI/Screen';
import Scene from '~/components/3D/MainScene';

export default function Home() {
  return (
    <main className={styles.main}>
      <Scene>
        <Screen />
      </Scene>
    </main>
  );
}
