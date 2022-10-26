import { SpotLight, SpotLightHelper } from 'three';

const createSpotlight = (color, intensity, position, angle, penumbra) => {
  const spotLight = new SpotLight({
    color,
    angle,
    intensity,
    penumbra,
  });
  spotLight.position.set(position.x, position.y, position.z);
  spotLight.castShadow = true;

  return spotLight;
};

const createSpotlightHelper = (spotlight) => new SpotLightHelper(spotlight);

const updateSpotlight = (spotlight, angle, penumbra, intensity) => {
  spotlight.angle = angle;
  spotlight.penumbra = penumbra;
  spotlight.intensity = intensity;
};

export { createSpotlight, createSpotlightHelper, updateSpotlight };
