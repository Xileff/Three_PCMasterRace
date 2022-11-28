/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

class GLTF {
  mesh;

  initialPos;

  name;

  speed = 1;

  yMin = -2;

  yMax = 100;

  zInitial;

  zView;

  scene;

  constructor(url, scene, position, name) {
    new GLTFLoader().load(url, (gltf) => {
      this.mesh = gltf;
      this.initialPos = position;
      this.name = name;
      this.scene = scene;

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

  // still experimental
  zoom(direction) {
    if (this.mesh == undefined || direction == undefined) return;

    if (direction === 'out') {
      if (this.mesh.scene.position.z > this.zInitial) {
        this.mesh.scene.position.z -= this.speed;
      }
    } else if (direction === 'in') {
      if (this.mesh.scene.position.z < this.zView) {
        this.mesh.scene.position.z += this.speed;
      }
    }
  }

  // check if mesh is loaded
  meshIsLoading() {
    return this.mesh == undefined;
  }
}

export default GLTF;
