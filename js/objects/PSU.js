import GLTF from './GLTF';

class PSU extends GLTF {
  yMin = -1.5;

  // yMax = 15;

  speed = 0.25;

  viewDistance = -13;

  viewHeight = 1;

  constructor(scene, position, name, rotation) {
    super('/models/powersupply/scene.gltf', scene, position, name, rotation);
  }
}

export default PSU;
