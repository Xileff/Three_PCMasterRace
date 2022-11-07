import GLTF from './GLTF';

class GPU extends GLTF {
  yMin = -15;

  yMax = 15;

  constructor(scene, position, name) {
    super('/models/gpu/scene.gltf', scene, position, name);
  }
}

export default GPU;
