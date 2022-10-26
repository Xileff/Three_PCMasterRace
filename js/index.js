/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
// Libraries
import 'bootstrap/dist/css/bootstrap.css';
import * as dat from 'dat.gui';
import { Raycaster, Vector2 } from 'three';

// 3D Models
import PC from './objects/PC';

// Utils
import { createRenderer, makeResponsiveWindow } from './utils/renderer';
import { createScene } from './utils/scene';
import { createPerspectiveCamera } from './utils/perspectiveCamera';
import { createOrbit } from './utils/orbitControl';
import {
  createSpotlight,
  createSpotlightHelper,
  updateSpotlight,
} from './utils/spotlight';
import { createAmbientLight } from './utils/ambientLight';
import { createDirectionalLight } from './utils/directionalLight';
import { createPointLight, createPointLightHelper } from './utils/pointLight';
import {
  createHemisphereLight,
  createHemisphereLightHelper,
} from './utils/hemisphereLight';
import { createPlane } from './utils/plane';
import { rotateX, rotateY, rotateZ } from './utils/rotation';
import { updateCoordinates } from './utils/rayCaster';
import {
  createSphere,
  creatSphereWireframe,
  rotateFreely,
  rotateFreelyReverse,
} from './utils/sphere';

// Debugging
const options = {
  // Spotlight
  angle: 1,
  penumbra: 0,
  intensity: 1,
};

const renderer = createRenderer(
  window.innerWidth,
  window.innerHeight,
  0x000000,
);
const scene = createScene();
const camera = createPerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const orbit = createOrbit(camera, renderer.domElement);

// PC, meja, dan sphere sebagai pembungkus
const sphere = createSphere(200, 32, 16, 0x000000);
const sphereWireframe = creatSphereWireframe(200, 54, 27);
const pc = new PC(scene, { x: 0, y: 0, z: 0 });
// const desk = createPlane(0xaaa9ad, 8, 8, {x: 0, y: -3.8, z: 0})

sphere.rotation.set(0, 0, 90);
sphereWireframe.rotation.set(0, 0, 90);

// Lightings
// Miring dikit di atas pc
const spotlight = createSpotlight(0xffffff, 1, { x: 4, y: 6, z: 4 }, 0.1, 1);
const spotlight1 = createSpotlight(0xff0000, 1, { x: -4, y: 6, z: -4 }, 0.1, 1);
const spotlight2 = createSpotlight(0x0000ff, 1, { x: 4, y: 6, z: -4 }, 0.1, 1);
const spotlightHelper = createSpotlightHelper(spotlight);
const spotlightHelper1 = createSpotlightHelper(spotlight1);
const spotlightHelper2 = createSpotlightHelper(spotlight2);

// Terangin seluruh scene
const ambientLight = createAmbientLight(0xffffff);
ambientLight.intensity = 0.5;

// Ada di dalem pc
const hemisphereLight = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: 0,
  y: 0,
  z: 0,
});
const hemisphereLightHelper = createHemisphereLightHelper(hemisphereLight, 1);

// Di dalem pc juga
const pointLight = createPointLight(0xffffff, 0.5, 100, 0.2, {
  x: 0,
  y: 0,
  z: 0,
});
const pointLightHelper = createPointLightHelper(pointLight, 1);

// Di atas kanan & atas kiri pc, yg biru & merah
const pointLight1 = createPointLight(0x0000ff, 1, 100, 0.2, {
  x: 10,
  y: 5,
  z: 0,
});
const pointLightHelper1 = createPointLightHelper(pointLight1, 1);
const pointLight2 = createPointLight(0xff0000, 1, 100, 0.2, {
  x: -10,
  y: 5,
  z: 0,
});
const pointLightHelper2 = createPointLightHelper(pointLight2, 1);

// Di depan, belakang, kanan, kiri pc
const directionalLight = createDirectionalLight(0xffffff, {
  x: 10,
  y: 0,
  z: 0,
});
const directionalLight1 = createDirectionalLight(0xffffff, {
  x: -10,
  y: 0,
  z: 0,
});
const directionalLight2 = createDirectionalLight(0xffffff, {
  x: 0,
  y: 0,
  z: 10,
});
const directionalLight3 = createDirectionalLight(0xffffff, {
  x: 0,
  y: 0,
  z: -10,
});

// Raycaster
const mousePosition = new Vector2();
watchMousePosition(mousePosition);
const rayCaster = new Raycaster();

// Masukin semua objects ke scene,
// kecuali yg GLTF(3d model dari luar) karena dilakuin dengan cara yang beda(di class)
const objects = [
  // desk,
  sphere,
  sphereWireframe,
  spotlight,
  spotlight1,
  spotlight2,
  ambientLight,
  hemisphereLight,
  pointLight,
  pointLight1,
  pointLight2,
  directionalLight,
  directionalLight1,
  directionalLight2,
  directionalLight3,
];

// Masukin semua object dan mulai animasi
objects.forEach((o) => scene.add(o));
start();

// Functions
function start() {
  camera.position.z = 7;
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  animate();
  // datGUI();
  makeResponsiveWindow(window, renderer, camera);
}

function animate() {
  requestAnimationFrame(animate);

  orbit.update();
  pc.animate();
  rotateFreely(sphere);
  rotateFreelyReverse(sphereWireframe);

  // Raycaster test(ini belom jadi)
  rayCaster.setFromCamera(mousePosition, camera);
  // const intersects = rayCaster.intersectObjects(scene.children);

  // for(let i = 0; i < intersects.length; i++){
  //     if(intersects[i].object.id !== desk.id) continue

  //     console.log(intersects[i].object.material.color)

  //     intersects[i].object.material.color.set(0xFF0000)
  // }
  // RayCaster test

  // rotateZ(desk, 0.005);

  renderer.render(scene, camera);
}

// For testing and debugging
function datGUI() {
  const gui = new dat.GUI();

  gui.add(options, 'angle', 0, 1);
  gui.add(options, 'penumbra', 0, 1);
  gui.add(options, 'intensity', 0, 1);
}

function watchMousePosition(mousePos) {
  window.addEventListener('mousemove', (e) => {
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}
