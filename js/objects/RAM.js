import GLTF from './GLTF';

class RAM extends GLTF {
  yMin = -3;

  // yMax = 15;

  speed = 0.25;

  viewDistance = 1;

  viewHeight = 3;

  constructor(scene, position, name, rotation) {
    super('/models/RAM/scene.gltf', scene, position, name, rotation);
  }
}

export default RAM;
