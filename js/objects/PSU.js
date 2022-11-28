import GLTF from './GLTF';

class PSU extends GLTF {
  yMin = -1.5;

  // yMax = 15;

  speed = 0.25;

  constructor(scene, position, name) {
    super('/models/powersupply/scene.gltf', scene, position, name);
  }
}

export default PSU;
