import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const createOrbit = (camera, canvas) => {
    return new OrbitControls( camera, canvas )
}

export { createOrbit };