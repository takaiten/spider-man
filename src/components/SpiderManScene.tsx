'use client';

import React from 'react';
import BABYLON from '@babylonjs/core';
import type { Scene } from '@babylonjs/core';

import BabylonScene from './BabylonScene';
import styles from './SpiderManScene.module.css';

type SpiderManSceneProps = {};

const onSceneReady = (scene: Scene) => {
  scene.createDefaultCameraOrLight(true, true, true);
  scene.createDefaultEnvironment();
  BABYLON.SceneLoader.Append('./', 'test.gltf', scene, function (scene) {
    // do something with the scene
  });
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {};

const SpiderManScene: React.FC<SpiderManSceneProps> = () => {
  return (
    <div className={styles.canvasContainers}>
      <BabylonScene
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        className={styles.canvas}
        id="main-canvas"
      />
    </div>
  );
};

export default SpiderManScene;
