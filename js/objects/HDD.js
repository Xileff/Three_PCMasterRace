import GLTF from './GLTF';

class NvmeSSD extends GLTF {
  yMin = -3;

  speed = 0.25;

  viewDistance = -16; // -5

  viewHeight = 0;

  constructor(scene, position, name, rotation) {
    super('/models/hdd/scene.gltf', scene, position, name, rotation);
  }
}

export default NvmeSSD;
