'use client';

import React, { Suspense } from 'react';
import { Engine, Scene, Skybox, Model } from 'react-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core';

import styles from './MainScene.module.css';

type MainSceneProps = {};

const CustomFallback = () => {
  return (
    <adtFullscreenUi name="ui">
      <rectangle name="rect" height="50px" width="150px">
        Loading...
      </rectangle>
    </adtFullscreenUi>
  );
};

const MainScene: React.FC<MainSceneProps> = () => {
  return (
    <div className={styles.scene}>
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene assignFrom="blurPostProcess">
          <Skybox rootUrl="/assets/textures/cubemap/nyc" size={10000} />
          <arcRotateCamera
            name="camera1"
            target={Vector3.Forward()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={8}
          />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
          <Suspense fallback={<CustomFallback />}>
            <Model rootUrl="/assets/scenes/" sceneFilename="main.babylon" name="spiderman1" />
          </Suspense>
        </Scene>
      </Engine>
    </div>
  );
};

export default MainScene;
