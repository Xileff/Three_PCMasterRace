/* eslint-disable import/prefer-default-export */
import {
  DoubleSide, Mesh, MeshBasicMaterial, MeshLambertMaterial, PlaneGeometry,
} from 'three';

const createPlane = (color, width, height, position) => {
  const plane = new Mesh(
    new PlaneGeometry(width, height),
    new MeshLambertMaterial({
      color,
      side: DoubleSide,
    }),
  );

  plane.position.set(position.x, position.y, position.z);
  plane.rotation.set(-0.5 * Math.PI, 0, 0);
  plane.receiveShadow = true;

  return plane;
};

export { createPlane };
