// Libraries
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { Clock } from 'three';

// Objects
import Cube from './objects/Cube';
import GPU from './objects/GPU';
import { createDirectionalLight } from './utils/directionalLight';
import { createHemisphereLight } from './utils/hemisphereLight';

// Utils
import { createOrbit } from './utils/orbitControl';
import { animateParticle, createParticles } from './utils/particles';
import { createPerspectiveCamera } from './utils/perspectiveCamera';
import { createPointLight } from './utils/pointLight';
import { createRenderer, makeResponsiveNonWindow, makeResponsiveWindow } from './utils/renderer';
import { createScene } from './utils/scene';
import { createSpotlight } from './utils/spotlight';

// Preparation
const renderer = createRenderer(window.innerWidth, window.innerHeight, 0x000000);
const scene = createScene();
const camera = createPerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = createOrbit(camera, renderer.domElement);

// Main part
// const cube = new Cube(2, { x: 0, y: 0, z: 0 }, 0x0000ff);
const gpu = new GPU(scene, { x: 0, y: -1, z: 3.5 });

// Lightings
const hemisphereLight = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: 0,
  y: 0,
  z: 0,
});
const pointLight = createPointLight(0xffffff, 1, 100, 0.2, {
  x: 0,
  y: 0,
  z: 0,
});
const hemisphereLightx1 = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: 2,
  y: 0,
  z: 0,
});
const hemisphereLightx2 = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: -2,
  y: 0,
  z: 0,
});
const hemisphereLighty1 = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: 0,
  y: 2,
  z: 0,
});
const hemisphereLighty2 = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: 0,
  y: 2,
  z: 0,
});
const hemisphereLightz1 = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: 0,
  y: 0,
  z: 4,
});
const hemisphereLightz2 = createHemisphereLight(0xffffff, 0xffffff, 1, {
  x: 0,
  y: 0,
  z: -2,
});

// const pointLight = createPointLight(0xffffff, 1, )

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

const spotlight = createSpotlight(0xffffff, 1, { x: 4, y: 6, z: 4 }, 0.1, 1);
const spotlight1 = createSpotlight(0xff0000, 1, { x: -4, y: 6, z: -4 }, 0.1, 1);
const spotlight2 = createSpotlight(0x0000ff, 1, { x: 4, y: 6, z: -4 }, 0.1, 1);

// Particles - experimental
const particlesMesh = createParticles(50000, 0.0005);
// Particles - experimental

// Put all objects in array and then start the animation
const objects = [
  // cube.mesh,
  directionalLight, directionalLight1, directionalLight2, directionalLight3,
  hemisphereLight, hemisphereLightx1, hemisphereLightx2, hemisphereLighty1, hemisphereLighty2,
  pointLight,
  spotlight,
  spotlight1,
  spotlight2,
  particlesMesh,
];

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
  // cube.animate();
  gpu.animate();
  // gpu.fade(0.07, 10);
  // gpu.fade(0.07, -10);
  animateParticle(particlesMesh);

  renderer.render(scene, camera);
}

// Script andu, buat ubah2 teks di halaman details
