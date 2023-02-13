'use client';

import React, { PropsWithChildren } from 'react';
import SceneComponent from 'babylonjs-hook';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import styles from './MainScene.module.css';

type MainSceneProps = PropsWithChildren<{}>;

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

const createText = (scene: BABYLON.Scene) => {
  // create a dynamic texture with the canvas
  const dynamicTexture = new BABYLON.DynamicTexture('dynamic texture', 512, scene);
  dynamicTexture.drawText(
    'NO WAY HOME',
    null,
    null,
    'normal 60px ShinGo',
    'white',
    null,
    true,
    true,
  );
  dynamicTexture.hasAlpha = true;

  // create a material with the dynamic texture
  const material = new BABYLON.StandardMaterial('material', scene);
  material.diffuseTexture = dynamicTexture;

  // create a plane
  const plane = BABYLON.MeshBuilder.CreatePlane(
    'plane',
    { width: 1.5, height: 1.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene,
  );
  plane.position = new BABYLON.Vector3(0.5, 1.4, -1);

  // assign the material to the plane
  plane.material = material;

  //Add text to dynamic texture
  return plane;
};

const onSceneReady = (scene: BABYLON.Scene) => {
  const startPosition = new BABYLON.Vector3(0, 1.4, 0);
  const startRotation = degreesToRadians(110);
  //! Camera
  const camera = new BABYLON.ArcRotateCamera(
    'camera1',
    startRotation,
    degreesToRadians(90),
    1,
    startPosition,
    scene,
    true,
  );
  camera.allowUpsideDown = false;
  camera.fov = 0.68;
  camera.minZ = 0.001;
  // This attaches the camera to the canvas
  // camera.attachControl(true, true);
  //! Plane
  const plane = createText(scene);
  scene.registerBeforeRender(() => {
    plane.lookAt(camera.position, -Math.PI);
  });
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

  //! --- Skybox ---
  // scene.createDefaultEnvironment({
  //   skyboxTexture: '/assets/textures/cubemap/nyc',
  //   rootPosition: new BABYLON.Vector3(0, -0.1, 0),
  //   setupImageProcessing: false,
  //   skyboxSize: 1000,
  // });
  //
  const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/assets/textures/cubemap/nyc', scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  //! --- Animation ---
  // Define the start and end position and rotation for the camera
  const endPosition = new BABYLON.Vector3(0, 0.1, 0);
  const endRotation = degreesToRadians(360);

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

  // create an animation group
  const animationGroup = new BABYLON.AnimationGroup('cameraAnimations');

  // add animations to the animation group
  animationGroup.addTargetedAnimation(positionAnimation, camera);
  animationGroup.addTargetedAnimation(rotationAnimation, camera);

  //! Load models
  BABYLON.SceneLoader.AppendAsync('/assets/objects/', 'platform.glb', scene);
  BABYLON.SceneLoader.AppendAsync('/assets/objects/', 'spiderman.glb', scene);
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
