import GLTF from './GLTF';

class SataSSD extends GLTF {
  // viewDistance = -2.5;
  viewDistance = -4;

  viewHeight = 0.75;

  speed = 0.1;

  constructor(scene, position, name, rotation) {
    super('/models/ssd/scene.gltf', scene, position, name, rotation);
  }
}

export default SataSSD;
