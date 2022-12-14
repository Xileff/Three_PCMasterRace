/* eslint-disable max-len */
/* eslint-disable default-param-last */
import { HemisphereLight, HemisphereLightHelper } from 'three';

const createHemisphereLight = (color, groundColor = 0xffffff, intensity, position) => {
  const hLight = new HemisphereLight(color, groundColor, intensity);
  hLight.position.set(position.x, position.y, position.z);

  return hLight;
};

const createHemisphereLightHelper = (hemisphereLight, sphereSize = 5) => new HemisphereLightHelper(hemisphereLight, sphereSize);

export { createHemisphereLight, createHemisphereLightHelper };
