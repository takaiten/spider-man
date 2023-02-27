import * as BABYLON from '@babylonjs/core';
import { degreesToRadians } from '../math';

export const createCameraAnimation = (camera: BABYLON.ArcRotateCamera) => {
  // Create an animation group
  const animationGroup = new BABYLON.AnimationGroup('cameraAnimations');

  // Calculate the animation duration in milliseconds
  const duration = 7000;
  const fps = 60;
  const frameCount = fps * (duration / 1000);

  // Define the end position and rotation for the camera
  const startPosition = camera.target;
  const endPosition = new BABYLON.Vector3(0, 0.15, 0);

  const positionAnimation = new BABYLON.Animation(
    'positionAnimation',
    'target',
    fps,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    // true,
  );
  //   positionAnimation.blendingSpeed = 0.01;

  // Define the keyframes for the animation
  positionAnimation.setKeys([
    { frame: 0, value: startPosition },
    { frame: frameCount, value: endPosition },
  ]);

  const startRotation = camera.alpha;
  const endRotation = degreesToRadians(320);

  const rotationAnimation = new BABYLON.Animation(
    'rotationAnimation',
    'alpha',
    fps,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    // true,
  );
  //   rotationAnimation.blendingSpeed = 0.01;

  // Define the keyframes for the animation
  rotationAnimation.setKeys([
    { frame: 0, value: startRotation },
    { frame: frameCount, value: endRotation },
  ]);

  // add animations to the animation group
  animationGroup.addTargetedAnimation(positionAnimation, camera);
  animationGroup.addTargetedAnimation(rotationAnimation, camera);

  return animationGroup;
};
