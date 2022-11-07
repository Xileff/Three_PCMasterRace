import GLTF from './GLTF';

class GPU extends GLTF {
  yMin = -15;

  yMax = 15;

  zInitial = 4.3;

  speed = 0.1;

  constructor(scene, position, name) {
    super('/models/gpu/scene.gltf', scene, position, name);
  }
}

export default GPU;
