// Libraries
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { Clock } from 'three';

// Objects
import Cube from './objects/Cube';

// Utils
import { createOrbit } from './utils/orbitControl';
import { animateParticle, createParticles } from './utils/particles';
import { createPerspectiveCamera } from './utils/perspectiveCamera';
import { createRenderer, makeResponsiveNonWindow, makeResponsiveWindow } from './utils/renderer';
import { createScene } from './utils/scene';

// Preparation
const renderer = createRenderer(window.innerWidth, window.innerHeight, 0x000000);
const scene = createScene();
const camera = createPerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = createOrbit(camera, renderer.domElement);

// Main part
const cube = new Cube(2, { x: 0, y: 0, z: 0 }, 0x0000ff);

// Particles - experimental
const particlesMesh = createParticles(50000, 0.0005);

// Particles - experimental

// Put all objects in array and then start the animation
const objects = [
  cube.mesh,
  particlesMesh,
];

objects.forEach((o) => scene.add(o));

start();

// Functions
function start() {
  camera.position.z = 3;
  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);
  animate();
  makeResponsiveWindow(window, renderer, camera);
}

function animate() {
  requestAnimationFrame(animate);

  orbit.update();
  cube.animate();
  animateParticle(particlesMesh);

  renderer.render(scene, camera);
}

// Script andu, buat ubah2 teks di halaman details
