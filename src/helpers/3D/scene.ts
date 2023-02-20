import * as BABYLON from '@babylonjs/core';
import { degreesToRadians } from '../math';

type Scene = BABYLON.Scene;

export const setupCamera = (...args: ConstructorParameters<typeof BABYLON.ArcRotateCamera>) => {
  const camera = Reflect.construct(BABYLON.ArcRotateCamera, args);
  camera.allowUpsideDown = false;
  camera.fov = degreesToRadians(30);
  camera.minZ = 0.001;
  return camera;
};

const createPointLight = (scene: Scene, name: string, pos: BABYLON.Vector3, debug = false) => {
  const light = new BABYLON.PointLight(name, pos, scene);
  if (debug) {
    const s = BABYLON.MeshBuilder.CreateSphere(name + '_debug', { diameter: 0.02 }, scene);
    s.position = pos;
  }
  return light;
};

export const setupLight = (scene: Scene) => {
  const pl1 = createPointLight(scene, 'pl1', new BABYLON.Vector3(0.5, 1.5, 0.2));
  pl1.intensity = 3;
  pl1.range = 2;
  const pl2 = createPointLight(scene, 'pl2', new BABYLON.Vector3(-0.2, 1.23, -0.2));
  pl2.intensity = 0.5;
  pl2.range = 0.1;
  pl2.diffuse = new BABYLON.Color3(0.99, 0.22, 0.59);
  const pl3 = createPointLight(scene, 'pl3', new BABYLON.Vector3(-0.1, 0.4, -0.2));
  pl3.intensity = 0.5;
  pl3.range = 0.1;
  const hsLight = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, 1, 0), scene);
  hsLight.intensity = 0.1;
  hsLight.groundColor = new BABYLON.Color3(0.63, 0.22, 0.37);
  // const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight, true);
  // shadowGenerator.useBlurExponentialShadowMap = true;
  // shadowGenerator.blurKernel = 64;
  return pl1;
};

export const setupPipeline = (scene: Scene) => {
  var pipeline = new BABYLON.DefaultRenderingPipeline('defaultPipeline', true, scene);
  pipeline.samples = 2;
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
};

export const setupEnvironment = (scene: Scene) => {
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  // scene.createDefaultEnvironment({
  //   skyboxTexture: '/assets/textures/cubemap/nyc',
  //   rootPosition: new BABYLON.Vector3(0, -0.1, 0),
  //   setupImageProcessing: false,
  //   skyboxSize: 1000,
  // });
  //
  // const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
  // const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
  // skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/assets/textures/cubemap/nyc', scene);
  // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  // skybox.material = skyboxMaterial;
};
