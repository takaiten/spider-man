'use client';

import React, { memo, Suspense } from 'react';
import { AssetManagerContextProvider, Engine, Model, Scene, SceneEventArgs } from 'react-babylonjs';
import { Color4 } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import Loading from './Loading';
import Lights from './Lights';
import Camera from './Camera';

import styles from './MainScene.module.css';

const onSceneReady = ({ scene }: SceneEventArgs) => {
  // Disable mouse controls
  scene.detachControl();
  // Make babylon canvas transparent
  scene.clearColor = new Color4(0, 0, 0, 0);
};

const MainScene: React.FC = () => {
  return (
    <div className={styles.scene}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene onSceneMount={onSceneReady}>
          <Camera />
          <Lights />
          <AssetManagerContextProvider>
            <Suspense fallback={<Loading />}>
              <Model name="spider-man" rootUrl="/assets/objects/" sceneFilename="spiderman.glb" />
              <Model name="platform" rootUrl="/assets/objects/" sceneFilename="platform.glb" />
            </Suspense>
          </AssetManagerContextProvider>
          <defaultRenderingPipeline hdr chromaticAberrationEnabled grainEnabled>
            <chromaticAberrationPostProcess
              assignFrom="chromaticAberration"
              aberrationAmount={10}
              radialIntensity={0.2}
            />
            <grainPostProcess assignFrom="grain" intensity={20} animated />
          </defaultRenderingPipeline>
        </Scene>
      </Engine>
    </div>
  );
};

export default memo(MainScene);
