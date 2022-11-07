import GLTF from './GLTF';

class CPU extends GLTF {
  yMin = -30;

  yMax = 100;

  constructor(scene, position, name) {
    super('/models/cpu/scene.gltf', scene, position, name);
  }

  animate() {
    if (this.mesh == undefined) return;
    this.mesh.scene.rotation.x += 0.005;
    this.mesh.scene.rotation.y += 0.005;
  }
}

export default CPU;
