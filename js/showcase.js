/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-undef */

// Libraries
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import gsap from 'gsap';
import Stats from 'stats.js';

// Utils
import { createOrbit } from './utils/orbitControl';
import { animateParticle, createParticles } from './utils/particles';
import { createPerspectiveCamera } from './utils/perspectiveCamera';
import { createPointLight } from './utils/pointLight';
import { createRenderer, makeResponsiveWindow } from './utils/renderer';
import { createScene } from './utils/scene';
import { createSpotlight } from './utils/spotlight';
import { createDirectionalLight } from './utils/directionalLight';
import { createHemisphereLight } from './utils/hemisphereLight';

// Objects
import GPU from './objects/GPU';
import CPU from './objects/CPU';
import Motherboard from './objects/Motherboard';
import RAM from './objects/RAM';
import NvmeSSD from './objects/NvmeSSD';
import SataSSD from './objects/SataSSD';
import HDD from './objects/HDD';
import PSU from './objects/PSU';

// Preparation
const renderer = createRenderer(window.innerWidth, window.innerHeight, 0x000000);
const scene = createScene();
const camera = createPerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-40, 100, 25);
camera.lookAt(-40, 100, 0);
let orbit = createOrbit(camera, renderer.domElement);
orbit.enableDamping = true;

// Main part
const cpu = new CPU(scene, { x: -40, y: 100, z: 0 }, 'CPU', { x: 1.6, y: 4.7, z: 0 });
const gpu = new GPU(scene, { x: 40, y: 100, z: 0 }, 'GPU', { x: 0, y: 0, z: 0 });
const motherboard = new Motherboard(scene, { x: 50, y: 50, z: 0 }, 'Motherboard', { x: 1.5, y: 0, z: 0 });
const ram = new RAM(scene, { x: 50, y: -50, z: 0 }, 'RAM', { x: 0, y: 0, z: 0 });
const nvmessd = new NvmeSSD(scene, { x: 40, y: -100, z: 0 }, 'M.2 NVME SSD', { x: 1.5, y: 0, z: 0 });
const satassd = new SataSSD(scene, { x: -40, y: -100, z: 0 }, 'SATA SSD', { x: 0, y: 0.73, z: 0 });
const hdd = new HDD(scene, { x: -50, y: -50, z: -3 }, 'HDD', { x: -0.2, y: 1.05, z: 0 });
const psu = new PSU(scene, { x: -50, y: 50, z: 0 }, 'PSU', { x: 0, y: 0.6, z: 0 });

// Lightings
const hemisphereLight = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 0, z: 0 });
const pointLight = createPointLight(0xffffff, 1, 100, 0.2, { x: 0, y: 0, z: 0 });
const hemisphereLightx1 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 2, y: 0, z: 0 });
const hemisphereLightx2 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: -2, y: 0, z: 0 });
const hemisphereLighty1 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 2, z: 0 });
const hemisphereLighty2 = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 2, z: 0 });

// Di depan, belakang, kanan, kiri pc
const directionalLight = createDirectionalLight(0xffffff, { x: 10, y: 0, z: 0 });
const directionalLight1 = createDirectionalLight(0xffffff, { x: -10, y: 0, z: 0 });
const directionalLight2 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: 10 });
const directionalLight3 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: -10 });
const spotlight = createSpotlight(0xffffff, 1, { x: 4, y: 6, z: 4 }, 0.1, 1);
const spotlight1 = createSpotlight(0xff0000, 1, { x: -4, y: 6, z: -4 }, 0.1, 1);
const spotlight2 = createSpotlight(0x0000ff, 1, { x: 4, y: 6, z: -4 }, 0.1, 1);

const particlesMesh = createParticles(50000, 0.3);

// Variables and arrays needed for animation
const objects = [
  directionalLight,
  directionalLight1,
  directionalLight2,
  directionalLight3,
  // hemisphereLight,
  // hemisphereLightx1,
  // hemisphereLightx2,
  // hemisphereLighty1,
  // hemisphereLighty2,
  // pointLight,
  // spotlight,
  // spotlight1,
  // spotlight2,
  particlesMesh,
];
objects.forEach((o) => scene.add(o));

let currentModel = cpu; // undefined
let currentOption = 'CPU';
let previousOption = currentOption;

const gltfModels = [cpu, gpu, motherboard, ram, nvmessd, satassd, psu, hdd];
const tl = gsap.timeline();
let prevOrbitTarget = {
  x: orbit.object.position.x,
  y: orbit.object.position.y,
  z: orbit.object.position.z,
};

// Framerate
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Initial orbit config
orbit.target.set(-40.00000000990247, 99.9933845715949, 0.2264628736384653);
orbit.saveState();

// Begin
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
animate();
makeResponsiveWindow(window, renderer, camera);

const audio = new Audio('/sounds/You Should.mp3');
audio.loop = true;
audio.load();
audio.volume = 0.3;
audio.play();

// Functions
function animate() {
  stats.begin();

  requestAnimationFrame(animate);
  updateModel(currentOption);

  if (orbit !== undefined) {
    orbit.update();
  }
  updateOrbitAngle();

  animateParticle(particlesMesh);
  renderer.render(scene, camera);

  stats.end();
}

function updateModel(newName) {
  if (newName == undefined) return;
  if (currentOption !== previousOption) {
    const modelToShow = gltfModels.filter((m) => m.name.toUpperCase() === newName.toUpperCase())[0];
    currentModel = modelToShow;
    const camrot = { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z };
    camera.rotation.set(camrot.x, camrot.y, camrot.z);
    const startOrientation = camera.quaternion.clone();
    const targetOrientation = camera.quaternion.clone().normalize();
    const { center, size } = modelToShow.getMeshPos();

    // Animation 3
    // 1. Reset orbit rotation
    // 2. Move the camera
    tl.from({}, {
      duration: 0,
      onUpdate() {
        camera.quaternion.copy(startOrientation).slerp(targetOrientation, this.progress());
      },
    });

    orbit.reset();
    orbit.enabled = false;
    orbit = undefined;

    tl.to(camera.position, {
      duration: 1.5,
      x: center.x,
      y: center.y,
      z: center.z + 4 * size.z + modelToShow.getViewDistance(),
      onComplete: () => {
        camera.lookAt(center.x, center.y, center.z);
        orbit = createOrbit(camera, renderer.domElement);
        orbit.enableDamping = true;
        orbit.target.set(center.x, center.y, center.z);
        orbit.saveState();
      },
    });

    previousOption = currentOption;
  }
}

function updateOrbitAngle() {
  if (orbit === undefined) return;

  prevOrbitTarget = {
    x: orbit.object.position.x,
    y: orbit.object.position.y,
    z: orbit.object.position.z,
  };
}

// Script andu, buat ubah2 teks di halaman details
$('.list-group-item').on('click', function () {
  if ($(this).html() === 'Daftar Komponen') return;

  $('.list-group-item').removeClass('active');
  $(this).addClass('active');

  const selectedComponent = $(this).html();
  $('#nama').html(selectedComponent);
  $('#headingName').html(selectedComponent);

  $.getJSON('../JSON/komponen.json', (allData) => {
    const { komponen } = allData;

    let deskripsi = '';
    let namaProduk = '';
    let deksripsiProduk = '';

    $.each(komponen, (i, data) => {
      if (data.nama.toUpperCase() == selectedComponent.toUpperCase()) {
        // Swap global var
        previousOption = currentOption;
        currentOption = data.nama.toUpperCase();

        deskripsi += `<p>${data.deskripsi}</p>`;
        namaProduk = `In Display : ${data.nama_produk}`;
        deksripsiProduk = `${data.deskripsi_produk.replaceAll('\n', '<br>')}`;
      }
    });
    $('#deskripsi').html(deskripsi);
    $('#nama-produk').html(namaProduk);
    $('#deskripsi-produk').html(deksripsiProduk);
  });
});

// Zoom in & out
document.addEventListener('keydown', (evt) => {
  let step;
  switch (evt.keyCode) {
    // Plus
    case 187:
      step = camera.position.z > currentModel.getMeshPos().center.z ? -2 : 2;
      gsap.to(camera.position, {
        duration: 0.2,
        z: camera.position.z + step,
      });

      break;

    // Minus
    case 189:
      step = camera.position.z > currentModel.getMeshPos().center.z ? 2 : -2;
      gsap.to(camera.position, {
        duration: 0.2,
        z: camera.position.z + step,
      });

      break;

    default:
      break;
  }
});
