import GLTF from './GLTF';

class GPU extends GLTF {
  constructor(scene, position) {
    super('/models/gpu/scene.gltf', scene, position);
  }

  // animate(){
  //   if (this.mesh == undefined) return;
  //   this.mesh.scene.rotation.y += 0.005;
  // }
}

export default GPU;
