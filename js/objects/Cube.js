import * as THREE from 'three';

class Cube {
  mesh;

  constructor(size, position, color) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(size.width, size.height, size.depth),
      new THREE.MeshBasicMaterial({ color }),
    );
    this.mesh.position.set(position.x, position.y, position.z);
  }

  animate() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}

export default Cube;
