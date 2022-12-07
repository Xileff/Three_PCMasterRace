import GLTF from './GLTF';

class CPU extends GLTF {
  yMin = -3;

  // yMax = 100;

  zInitial = -100;

  viewDistance = 25;

  viewHeight = 0;

  constructor(scene, position, name, rotation) {
    super('/models/cpu/scene.gltf', scene, position, name, rotation);
  }

  animate() {
    if (this.mesh == undefined) return;

    this.mesh.scene.rotation.y = -1.5;
    this.mesh.scene.rotation.z -= 0.005;
  }
}

export default CPU;
