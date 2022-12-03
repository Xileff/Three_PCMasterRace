import GLTF from './GLTF';

class PC extends GLTF {
  constructor(scene, position, name, rotation) {
    super('/models/pc/scene.gltf', scene, position, name, rotation);
  }
}

export default PC;
