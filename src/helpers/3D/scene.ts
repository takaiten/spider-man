import * as BABYLON from '@babylonjs/core';

type Scene = BABYLON.Scene;

export const setupCamera = (...args: ConstructorParameters<typeof BABYLON.ArcRotateCamera>) => {
  const camera = Reflect.construct(BABYLON.ArcRotateCamera, args);
  camera.allowUpsideDown = false;
  camera.fov = 0.68;
  camera.minZ = 0.001;
  return camera;
};

export const setupLight = (scene: Scene) => {
  const light = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, -1, 0), scene);
  light.intensity = 0.1;
  const dirLight = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(1, -2, -1), scene);
  dirLight.intensity = 2;
  const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight, true);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.blurKernel = 64;
  return light;
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

const createScene = (scene: Scene) => {};
