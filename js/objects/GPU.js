import GLTF from './GLTF';

class GPU extends GLTF {
  yMin = -1;

  // yMax = 30;

  zInitial = -20;

  viewDistance = 2;

  viewHeight = 1.1;

  speed = 0.1;

  constructor(scene, position, name, rotation) {
    super('/models/gpu/scene.gltf', scene, position, name, rotation);
  }
}

export default GPU;
