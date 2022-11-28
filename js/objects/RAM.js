import GLTF from './GLTF';

class RAM extends GLTF {
  yMin = -3;

  // yMax = 15;

  speed = 0.25;

  constructor(scene, position, name) {
    super('/models/RAM/scene.gltf', scene, position, name);
  }
}

export default RAM;
