import GLTF from './GLTF';

class Motherboard extends GLTF {
  yMin = -15;

  yMax = 15;

  zInitial = 4;

  speed = 0.1;

  constructor(scene, position, name) {
    super('/models/motherboard_am4/scene.gltf', scene, position, name);
  }

  animate() {
    if (this.mesh == undefined) return;

    this.mesh.scene.rotation.x = 1.50499999999999;
    this.mesh.scene.rotation.z += 0.005;
  }

  fade(speed, yTarget) {
    if (this.mesh == undefined) return;

    // Fade down
    if (yTarget < 1 && this.mesh.scene.position.y > yTarget) {
      this.mesh.scene.position.y -= speed;
    }

    // Fade up
    if (yTarget > 1 && this.mesh.scene.position.y < yTarget) {
      this.mesh.scene.position.y += speed;
    }
  }
}

export default Motherboard;
