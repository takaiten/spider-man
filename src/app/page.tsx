import styles from './page.module.css';

import Background from '~/components/UI/Background';
import Screen from '~/components/UI/Screen';
import Scene from '~/components/3D/MainScene';
import Text from '~/components/UI/Text';

export default function Home() {
  return (
    <main className={styles.main}>
      <Background />
      <Scene>
        <Screen />
      </Scene>
      <Text />
    </main>
  );
}
