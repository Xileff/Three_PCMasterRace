import GLTF from './GLTF';

class HDD extends GLTF {
  yMin = -20;

  yMax = 20;

  speed = 0.25;

  constructor(scene, position, name) {
    super('/models/hdd/scene.gltf', scene, position, name);
  }
}

export default HDD;
