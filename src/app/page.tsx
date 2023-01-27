import styles from './page.module.css';

import SpiderManScene from '~/components/SpiderManScene';
import HUD from '~/components/HeadsUpDisplay';

export default function Home() {
  return (
    <main className={styles.main}>
      <HUD />
      <SpiderManScene />
    </main>
  );
}
