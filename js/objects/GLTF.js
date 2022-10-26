/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

class GLTF {
  mesh;

  constructor(url, scene, position) {
    new GLTFLoader().load(url, (gltf) => {
      this.mesh = gltf;
      this.initialPos = position;

      this.mesh.scene.position.x = position.x;
      this.mesh.scene.position.y = position.y;
      this.mesh.scene.position.z = position.z;

      this.mesh.scene.traverse((node) => {
        node.castShadow = node.isMesh;
      });

      scene.add(this.mesh.scene);
    });
  }

  animate() {
    if (this.mesh == undefined) return;
    this.mesh.scene.rotation.y += 0.005;
  }

  // fadeDiagonal(speed, pos){
  //   if(this.mesh == undefined) return;
  //   const { xTarget, yTarget } = pos;
  //   const { x, y } = this.getInitialPos();

  //   if(xTarget === x && yTarget === y){
  //     // Gausah di
  //   }
  // }

  fade(speed, yTarget) {
    if (this.mesh == undefined) return;

    // Fade down
    if (yTarget < 0 && this.mesh.scene.position.y > yTarget) {
      this.mesh.scene.position.y -= speed;
    }

    // Fade up
    if (yTarget > 0 && this.mesh.scene.position.y < yTarget) {
      this.mesh.scene.position.y += speed;
    }
  }

  getInitialPos() {
    if (this.mesh == undefined) return;
    return {
      x: this.initialPos.x,
      y: this.initialPos.y,
    };
  }
}

export default GLTF;
