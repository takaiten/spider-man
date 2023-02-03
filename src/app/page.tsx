import styles from './page.module.css';

import HUD from '~/components/HeadsUpDisplay';
import MainScene from '~/components/MainScene';

export default function Home() {
  return (
    <main className={styles.main}>
      <HUD />
      <MainScene />
    </main>
  );
}
