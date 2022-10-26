import { CameraHelper, DirectionalLight, DirectionalLightHelper } from 'three';

const createDirectionalLight = (color, position) => {
  const dLight = new DirectionalLight(color);
  dLight.position.set(position.x, position.y, position.z);
  dLight.castShadow = true;

  return dLight;
};

const createDirectionalLightHelper = (dLight) => new DirectionalLightHelper(dLight);

const createDirectionalLightShadowHelper = (dLight) => new CameraHelper(dLight.shadow.camera);

export { createDirectionalLight, createDirectionalLightHelper, createDirectionalLightShadowHelper };
