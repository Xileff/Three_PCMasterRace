import GLTF from './GLTF';

class NvmeSSD extends GLTF {
  yMin = -3;

  speed = 0.25;

  viewDistance = 4;

  viewHeight = 2;

  constructor(scene, position, name, rotation) {
    super('/models/nvmessd/scene.gltf', scene, position, name, rotation);
  }
}

export default NvmeSSD;
