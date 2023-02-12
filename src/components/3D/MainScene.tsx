'use client';

import React from 'react';
import SceneComponent, { useScene } from 'babylonjs-hook';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import styles from './MainScene.module.css';

type MainSceneProps = {};

const onSceneReady = (scene: BABYLON.Scene) => {
  //! Camera
  const camera = new BABYLON.ArcRotateCamera(
    'camera1',
    0,
    Math.PI / 2,
    1,
    new BABYLON.Vector3(0, 1.7, 0),
    scene,
    true,
  );
  camera.allowUpsideDown = false;
  camera.fov = 0.6;
  camera.minZ = 0.001;
  // This attaches the camera to the canvas
  camera.attachControl(true, true);
  //! --- Light ---
  const light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(1, -2, -1), scene);
  light.intensity = 2;
  //! --- Shadow Generator ---
  const shadowGenerator = new BABYLON.ShadowGenerator(1024, light, true, camera);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.blurKernel = 64;
  //! --- Pipeline ---
  // default rendering pipeline [test]
  var pipeline = new BABYLON.DefaultRenderingPipeline('defaultPipeline', true, scene, [camera]);
  pipeline.samples = 2;
  // dof
  // pipeline.depthOfFieldEnabled = true;
  // pipeline.depthOfFieldBlurLevel = BABYLON.DepthOfFieldEffectBlurLevel.Medium;
  // pipeline.depthOfField.focusDistance = 1000;
  // pipeline.depthOfField.focalLength = 50;
  // pipeline.depthOfField.fStop = 1.4;
  //bloom
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.8;
  pipeline.bloomWeight = 0.3;
  pipeline.bloomKernel = 64;
  pipeline.bloomScale = 0.5;
  // chromatic
  pipeline.chromaticAberrationEnabled = true;
  pipeline.chromaticAberration.radialIntensity = 3;
  // grain
  pipeline.grainEnabled = true;
  pipeline.grain.intensity = 10;
  pipeline.grain.animated = true;

  scene.createDefaultEnvironment({
    skyboxTexture: '/assets/textures/cubemap/nyc',
    rootPosition: new BABYLON.Vector3(0, -0.1, 0),
    setupImageProcessing: false,
    skyboxSize: 1000,
  });

  //! --- Skybox ---
  // const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
  // const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
  // skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/assets/textures/cubemap/nyc', scene);
  // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  // skybox.material = skyboxMaterial;

  //! --- Animation ---
  // Define the start and end position and rotation for the camera
  const startPosition = new BABYLON.Vector3(0, 1.7, 0);
  const endPosition = new BABYLON.Vector3(0, 0.1, 0);
  const startRotation = Math.PI;
  const endRotation = 2 * Math.PI;

  // Calculate the animation duration in milliseconds
  const duration = 7000;
  const fps = 24;
  const frameCount = fps * (duration / 1000);

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
  // Apply the animation to the camera
  camera.animations.push(positionAnimation);

  // Repeat the process for the camera's rotation
  const rotationAnimation = new BABYLON.Animation(
    'rotationAnimation',
    'alpha',
    fps,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
  );
  rotationAnimation.setKeys([
    { frame: 0, value: startRotation },
    { frame: frameCount, value: endRotation },
  ]);
  camera.animations.push(rotationAnimation);
  //! Load model
  BABYLON.SceneLoader.Append('/assets/objects/', 'platform.glb', scene);
  BABYLON.SceneLoader.AppendAsync('/assets/objects/', 'spiderman.glb', scene).then((s) => {
    s.beginAnimation(s.activeCamera, 0, frameCount, false, 1);
  });
};

const MainScene: React.FC<MainSceneProps> = () => {
  return (
    <div className={styles.scene}>
      <SceneComponent antialias onSceneReady={onSceneReady}></SceneComponent>
    </div>
  );
};

export default MainScene;
