/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import { Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

class GLTF {
  mesh;

  initialPos;

  name;

  speed = 1;

  yMin = -2;

  yMax = 100;

  zInitial;

  viewDistance;

  viewHeight;

  scene;

  constructor(url, scene, position, name, rotation) {
    new GLTFLoader().load(url, (gltf) => {
      this.mesh = gltf;
      this.initialPos = position;
      this.name = name;
      this.scene = scene;

      this.mesh.scene.position.x = position.x;
      this.mesh.scene.position.y = position.y;
      this.mesh.scene.position.z = position.z;

      this.mesh.scene.rotation.x = rotation.x;
      this.mesh.scene.rotation.y = rotation.y;
      this.mesh.scene.rotation.z = rotation.z;

      this.mesh.scene.traverse((node) => {
        node.castShadow = node.isMesh;
      });

      scene.add(this.mesh.scene);
    });
  }

  getX() {
    if (this.mesh == undefined) return;
    return this.mesh.scene.position.x;
  }

  getY() {
    if (this.mesh == undefined) return;
    return this.mesh.scene.position.y;
  }

  getZ() {
    if (this.mesh == undefined) return;
    return this.mesh.scene.position.z;
  }

  getViewDistance() {
    if (this.mesh == undefined) return;
    return this.viewDistance;
  }

  getViewHeight() {
    if (this.mesh == undefined) return;
    return this.viewHeight;
  }

  setRotation(x, y, z) {
    if (this.mesh == undefined) return;
    this.mesh.scene.rotation.x = x;
    this.mesh.scene.rotation.y = y;
    this.mesh.scene.rotation.z = z;
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

  getMeshPos() {
    if (this.mesh === undefined) return;

    const aabb = new Box3().setFromObject(this.mesh.scene);
    const center = aabb.getCenter(new Vector3());
    const size = aabb.getSize(new Vector3());
    return { center, size };
  }

  // check if mesh is loaded
  meshIsLoading() {
    return this.mesh == undefined;
  }
}

export default GLTF;
