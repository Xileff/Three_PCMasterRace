/* eslint-disable default-param-last */
import { PointLight, PointLightHelper } from 'three';

const createPointLight = (color, intensity, distance, decay = 0.2, position) => {
  const pLight = new PointLight(color, intensity, distance, decay);
  pLight.position.set(position.x, position.y, position.z);
  pLight.castShadow = true;
  return pLight;
};

const createPointLightHelper = (pointLight, sphereSize = 1) => {
  const pLightHelper = new PointLightHelper(pointLight, sphereSize);

  return pLightHelper;
};

export { createPointLight, createPointLightHelper };
