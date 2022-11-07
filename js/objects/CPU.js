import GLTF from './GLTF';

class CPU extends GLTF {
  yMin = -30;

  yMax = 100;

  // speed = 0.38;
  speed = 1;

  zInitial = -100;

  zView = -15;

  constructor(scene, position, name) {
    super('/models/cpu/scene.gltf', scene, position, name);
  }

  animate() {
    if (this.mesh == undefined) return;

    this.mesh.scene.rotation.y = -1.5;
    this.mesh.scene.rotation.z -= 0.005;
  }
}

export default CPU;
