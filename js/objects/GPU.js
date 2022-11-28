import GLTF from './GLTF';

class GPU extends GLTF {
  yMin = -1;

  // yMax = 30;

  zInitial = -20;

  zView = 4.3;

  speed = 0.1;

  constructor(scene, position, name) {
    super('/models/gpu/scene.gltf', scene, position, name);
  }
}

export default GPU;
