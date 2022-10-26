import GLTF from './GLTF';

class PC extends GLTF {
  constructor(scene, position) {
    super('/models/pc/scene.gltf', scene, position);
  }
}

export default PC;
