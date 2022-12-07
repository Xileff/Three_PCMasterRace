import {
  Object3D, PointLight, PointLightHelper, SphereGeometry,
} from 'three';

class RotatingLight {
  rotationCenter;

  light;

  constructor(color, intensity, distance, position) {
    const light = new PointLight(color, intensity, distance);
    // const lightHelper = new PointLightHelper(light);

    light.position.set(position.x - 50, position.y, position.z + 20);
    // lightHelper.add(light);

    const rotationCenter = new Object3D();
    rotationCenter.add(light);

    this.rotationCenter = rotationCenter;
    this.light = light;
  }

  getRotationCenter() {
    return this.rotationCenter;
  }

  setLightPosition(x, y, z) {
    this.light.position.set(x, y, z);
  }
}

export default RotatingLight;
