/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
// Libraries
import 'bootstrap/dist/css/bootstrap.css';

// 3D Models
import PC from './objects/PC';

// Utils
import { createRenderer, makeResponsiveWindow } from './utils/renderer';
import { createScene } from './utils/scene';
import { createPerspectiveCamera } from './utils/perspectiveCamera';
import { createOrbit } from './utils/orbitControl';
import { createSpotlight } from './utils/spotlight';
import { createAmbientLight } from './utils/ambientLight';
import { createDirectionalLight } from './utils/directionalLight';
import { createPointLight } from './utils/pointLight';
import { createHemisphereLight } from './utils/hemisphereLight';
import {
  createSphere, creatSphereWireframe, rotateFreely, rotateFreelyReverse,
} from './utils/sphere';

const renderer = createRenderer(window.innerWidth, window.innerHeight, 0x000000);
const scene = createScene();
const camera = createPerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = createOrbit(camera, renderer.domElement);

// PC, meja, dan sphere sebagai pembungkus
const sphere = createSphere(200, 32, 16, 0x000000);
const sphereWireframe = creatSphereWireframe(200, 54, 27);
const pc = new PC(scene, { x: 0, y: 0, z: 0 }, 'PC');

sphere.rotation.set(0, 0, 90);
sphereWireframe.rotation.set(0, 0, 90);

// Lightings
// Miring dikit di atas pc
const spotlight = createSpotlight(0xffffff, 1, { x: 4, y: 6, z: 4 }, 0.1, 1);
const spotlight1 = createSpotlight(0xff0000, 1, { x: -4, y: 6, z: -4 }, 0.1, 1);
const spotlight2 = createSpotlight(0x0000ff, 1, { x: 4, y: 6, z: -4 }, 0.1, 1);

// Terangin seluruh scene
const ambientLight = createAmbientLight(0xffffff);
ambientLight.intensity = 0.5;

// Ada di dalem pc
const hemisphereLight = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 0, z: 0 });

// Di dalem pc juga
const pointLight = createPointLight(0xffffff, 0.5, 100, 0.2, { x: 0, y: 0, z: 0 });

// Di atas kanan & atas kiri pc, yg biru & merah
const pointLight1 = createPointLight(0x0000ff, 1, 100, 0.2, { x: 10, y: 5, z: 0 });
const pointLight2 = createPointLight(0xff0000, 1, 100, 0.2, { x: -10, y: 5, z: 0 });

// Di depan, belakang, kanan, kiri pc
const directionalLight = createDirectionalLight(0xffffff, { x: 10, y: 0, z: 0 });
const directionalLight1 = createDirectionalLight(0xffffff, { x: -10, y: 0, z: 0 });
const directionalLight2 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: 10 });
const directionalLight3 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: -10 });

// Masukin semua objects ke scene,
// kecuali yg GLTF(3d model dari luar) karena dilakuin dengan cara yang beda(di class)
const objects = [
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
  makeResponsiveWindow(window, renderer, camera);
}

function animate() {
  requestAnimationFrame(animate);

  orbit.update();
  rotateFreely(sphere);
  rotateFreelyReverse(sphereWireframe);

  if (!pc.meshIsLoading()) {
    document.getElementById('loader').style.display = 'none';
    pc.animate();
  }

  renderer.render(scene, camera);
}
