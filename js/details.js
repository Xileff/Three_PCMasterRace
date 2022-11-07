/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-undef */

// Libraries
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

// Objects
import GPU from './objects/GPU';
import CPU from './objects/CPU';
import { createDirectionalLight } from './utils/directionalLight';
import { createHemisphereLight } from './utils/hemisphereLight';

// Utils
import { createOrbit } from './utils/orbitControl';
import { animateParticle, createParticles } from './utils/particles';
import { createPerspectiveCamera } from './utils/perspectiveCamera';
import { createPointLight } from './utils/pointLight';
import { createRenderer, makeResponsiveWindow } from './utils/renderer';
import { createScene } from './utils/scene';
import { createSpotlight } from './utils/spotlight';
import Motherboard from './objects/Motherboard';

// Preparation
const renderer = createRenderer(window.innerWidth, window.innerHeight, 0x000000);
const scene = createScene();
const camera = createPerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = createOrbit(camera, renderer.domElement);

// Main part
// const cpu = new CPU(scene, { x: 0, y: -1, z: -15 }, 'CPU');
const cpu = new CPU(scene, { x: 0, y: -1, z: -100 }, 'CPU');
const gpu = new GPU(scene, { x: 0, y: 15, z: 4.3 }, 'GPU');
const motherboard = new Motherboard(scene, { x: 0, y: 15, z: 4 }, 'Motherboard');

// Lightings
const hemisphereLight = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 0, z: 0 });
const pointLight = createPointLight(0xffffff, 1, 100, 0.2, { x: 0, y: 0, z: 0 });
const hemisphereLightx1 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 2, y: 0, z: 0 });
const hemisphereLightx2 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: -2, y: 0, z: 0 });
const hemisphereLighty1 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 2, z: 0 });
const hemisphereLighty2 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 2, z: 0 });
const hemisphereLightz1 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 0, z: 4 });
const hemisphereLightz2 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 0, z: -2 });

// Di depan, belakang, kanan, kiri pc
const directionalLight = createDirectionalLight(0xffffff, { x: 10, y: 0, z: 0 });
const directionalLight1 = createDirectionalLight(0xffffff, { x: -10, y: 0, z: 0 });
const directionalLight2 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: 10 });
const directionalLight3 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: -10 });
const spotlight = createSpotlight(0xffffff, 1, { x: 4, y: 6, z: 4 }, 0.1, 1);
const spotlight1 = createSpotlight(0xff0000, 1, { x: -4, y: 6, z: -4 }, 0.1, 1);
const spotlight2 = createSpotlight(0x0000ff, 1, { x: 4, y: 6, z: -4 }, 0.1, 1);

const particlesMesh = createParticles(50000, 0.2);

// Put all objects in array and then start the animation
const objects = [
  directionalLight,
  directionalLight1,
  directionalLight2,
  directionalLight3,
  hemisphereLight,
  hemisphereLightx1,
  hemisphereLightx2,
  hemisphereLighty1,
  hemisphereLighty2,
  pointLight,
  spotlight,
  spotlight1,
  spotlight2,
  particlesMesh,
];

const gltfModels = [cpu, gpu, motherboard];

objects.forEach((o) => scene.add(o));

// Initialize global var for tracking current option
let currentOption = 'CPU';
let previousOption = currentOption;
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
  gltfModels.forEach((m) => m.animate());

  updateModel(currentOption, previousOption);
  animateParticle(particlesMesh);

  renderer.render(scene, camera);
}

function updateModel(newName, oldName) {
  if (newName == undefined || oldName == undefined) return;

  if (currentOption !== previousOption) {
    const modelToShow = gltfModels.filter((m) => m.name.toUpperCase() === newName.toUpperCase())[0];
    const modelToHide = gltfModels.filter((m) => m.name.toUpperCase() === oldName.toUpperCase())[0];

    modelToShow.fade(modelToShow.speed, -1);
    modelToHide.fade(modelToHide.speed, modelToHide.yMax);
  }
}

// Script andu, buat ubah2 teks di halaman det
$('.list-group-item').on('click', function () {
  $('.list-group-item').removeClass('active');
  $(this).addClass('active');

  const selectedComponent = $(this).html();
  $('#namaKom').html(selectedComponent);
  $('#headingName').html(selectedComponent);

  $.getJSON('../JSON/komponen.json', (allData) => {
    const { komponen } = allData;

    let detail = '';
    $.each(komponen, (i, data) => {
      if (data.nama.toUpperCase() == selectedComponent.toUpperCase()) {
        // Swap global var
        previousOption = currentOption;
        currentOption = data.nama.toUpperCase();

        detail += `<p>${data.deskripsi}</p>`;
      }
    });
    $('#deskripsi').html(detail);
  });
});
