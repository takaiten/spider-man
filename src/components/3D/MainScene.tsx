'use client';

import React, { PropsWithChildren } from 'react';
import SceneComponent from 'babylonjs-hook';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import { setupCamera, setupEnvironment, setupLight, setupPipeline } from '~/helpers/3D/scene';
import styles from './MainScene.module.css';

type MainSceneProps = PropsWithChildren<{}>;

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

const onSceneReady = (scene: BABYLON.Scene) => {
  //! Load models
  BABYLON.SceneLoader.ImportMeshAsync('', '/assets/objects/', 'spiderman.glb', scene);
  BABYLON.SceneLoader.ImportMeshAsync('', '/assets/objects/', 'platform.glb', scene);

  setupLight(scene);
  setupPipeline(scene);
  setupEnvironment(scene);

  const startPosition = new BABYLON.Vector3(0, 1.4, 0);
  const startRotation = degreesToRadians(110);

  const camera = setupCamera(
    'camera1',
    startRotation,
    degreesToRadians(90),
    1,
    startPosition,
    scene,
    true,
  );
  // camera.attachControl(true, true);

  //! --- Animation ---
  // create an animation group
  const animationGroup = new BABYLON.AnimationGroup('cameraAnimations');

  // Calculate the animation duration in milliseconds
  const duration = 7000;
  const fps = 24;
  const frameCount = fps * (duration / 1000);

  // Define the end position and rotation for the camera
  const endPosition = new BABYLON.Vector3(0, 0.1, 0);

  const positionAnimation = new BABYLON.Animation(
    'positionAnimation',
    'target',
    fps,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
  );

  // Define the keyframes for the animation
  positionAnimation.setKeys([
    { frame: 0, value: startPosition },
    { frame: frameCount, value: endPosition },
  ]);

  const endRotation = degreesToRadians(330);

  const rotationAnimation = new BABYLON.Animation(
    'rotationAnimation',
    'alpha',
    fps,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
  );

  // Define the keyframes for the animation
  rotationAnimation.setKeys([
    { frame: 0, value: startRotation },
    { frame: frameCount, value: endRotation },
  ]);

  // add animations to the animation group
  animationGroup.addTargetedAnimation(positionAnimation, camera);
  animationGroup.addTargetedAnimation(rotationAnimation, camera);
};

const MainScene: React.FC<MainSceneProps> = ({ children }) => {
  return (
    <div className={styles.scene}>
      <SceneComponent antialias onSceneReady={onSceneReady}>
        {children}
      </SceneComponent>
    </div>
  );
};

export default MainScene;
