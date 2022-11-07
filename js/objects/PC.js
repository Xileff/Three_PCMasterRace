import GLTF from './GLTF';

class PC extends GLTF {
  constructor(scene, position, name) {
    super('/models/pc/scene.gltf', scene, position, name);
  }
}

export default PC;
