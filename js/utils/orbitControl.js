/* eslint-disable import/prefer-default-export */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createOrbit = (camera, canvas) => new OrbitControls(camera, canvas);

export { createOrbit };
