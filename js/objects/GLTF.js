import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class GLTF {
    mesh;

    constructor(url, scene, position) {
        new GLTFLoader().load(url, gltf => {
            this.mesh = gltf

            this.mesh.scene.position.x = position.x
            this.mesh.scene.position.y = position.y
            this.mesh.scene.position.z = position.z

            this.mesh.scene.traverse(node => node.castShadow = node.isMesh ? true : false)
            
            scene.add(this.mesh.scene)
        })
    }

    animate(){
        if(this.mesh == undefined) return
        this.mesh.scene.rotation.y += 0.005
    }
}

export default GLTF;