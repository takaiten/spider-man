import React, { memo } from 'react';
import { ArcRotateCamera, Vector3 } from '@babylonjs/core';

import { createCameraAnimation } from '~/helpers/3D/cameraAnimation';
import { degreesToRadians } from '~/helpers/math';

const Camera: React.FC = () => {
  const onCameraReady = (camera: ArcRotateCamera) => {
    const animGroup = createCameraAnimation(camera as ArcRotateCamera);
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.clientHeight - window.innerHeight);
      animGroup.goToFrame(progress * animGroup.to);
      animGroup.play();
      animGroup.pause();
    };
    window.addEventListener('scroll', handleScroll, false);
  };

  return (
    <arcRotateCamera
      name="camera1"
      onCreated={onCameraReady}
      alpha={degreesToRadians(110)}
      beta={degreesToRadians(90)}
      target={new Vector3(0, 1.4, 0)}
      fov={degreesToRadians(30)}
      radius={1.2}
      minZ={0.01}
    />
  );
};

export default memo(Camera);
