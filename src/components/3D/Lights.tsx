import React, { memo } from 'react';
import { Color3, Vector3 } from '@babylonjs/core';

type LightsProps = {};

const Lights: React.FC<LightsProps> = () => {
  return (
    <>
      <pointLight name="pl1" position={new Vector3(0.5, 1.5, 0.2)} intensity={3} range={2} />
      <pointLight
        name="pl1"
        diffuse={new Color3(0.99, 0.22, 0.59)}
        position={new Vector3(-0.2, 1.23, -0.2)}
        intensity={0.5}
        range={0.1}
      />
      <pointLight name="pl1" position={new Vector3(-0.1, 0.4, -0.2)} intensity={0.5} range={0.1} />
      <hemisphericLight
        name="hl1"
        direction={Vector3.Up()}
        intensity={0.1}
        groundColor={new Color3(0.63, 0.22, 0.37)}
      />
    </>
  );
};

export default memo(Lights);
