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
import { HemisphereLight, HemisphereLightHelper, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PointLight, PointLightHelper, Raycaster, SphereGeometry, Vector3 } from 'three';
import { createOrbit } from './utils/orbitControl';
import { animateParticle, createParticles } from './utils/particles';
import { createPerspectiveCamera } from './utils/perspectiveCamera';
import { createRenderer, makeResponsiveWindow } from './utils/renderer';
import { createScene } from './utils/scene';

// Objects
import GPU from './objects/GPU';
import CPU from './objects/CPU';
import Motherboard from './objects/Motherboard';
import RAM from './objects/RAM';
import NvmeSSD from './objects/NvmeSSD';
import SataSSD from './objects/SataSSD';
import HDD from './objects/HDD';
import PSU from './objects/PSU';
import RotatingLight from './utils/rotatingLight';
import { createAmbientLight } from './utils/ambientLight';
import { createHemisphereLight } from './utils/hemisphereLight';
import { createPointLight } from './utils/pointLight';
import { createDirectionalLight } from './utils/directionalLight';
import { createSpotlight } from './utils/spotlight';

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
const speed1 = 0.01;
const speed2 = 0.02;
const speed3 = 0.03;

// Static lighting
// const mainLight = new HemisphereLight(0xFFFFFF, 0xFFFFFF, 2);
const spotlight = createSpotlight(0xffffff, 1, { x: 4, y: 6, z: 4 }, 0.1, 1);
const spotlight1 = createSpotlight(0xff0000, 1, { x: -4, y: 6, z: -4 }, 0.1, 1);
const spotlight2 = createSpotlight(0x0000ff, 1, { x: 4, y: 6, z: -4 }, 0.1, 1);

const ambientLight = createAmbientLight(0xffffff);
ambientLight.intensity = 0.5;

const hemisphereLight = createHemisphereLight(0xffffff, 0xffffff, 1, { x: 0, y: 0, z: 0 });

const pointLight = createPointLight(0xffffff, 0.5, 100, 0.2, { x: 0, y: 0, z: 0 });

const directionalLight = createDirectionalLight(0xffffff, { x: 10, y: 0, z: 0 });
const directionalLight1 = createDirectionalLight(0xffffff, { x: -10, y: 0, z: 0 });
const directionalLight2 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: 10 });
const directionalLight3 = createDirectionalLight(0xffffff, { x: 0, y: 0, z: -10 });

const staticLights = [
  spotlight,
  spotlight1,
  spotlight2,
  ambientLight,
  hemisphereLight,
  pointLight,
  directionalLight,
  directionalLight2,
];

// Dynamic lighting
const lightController1 = new RotatingLight(0xFFFFFF, 2, 100, {
  x: -40.00000000990247,
  y: 129.9933845715949,
  z: 0.2264628736384653,
});
const light1 = lightController1.getRotationCenter();

const lightController2 = new RotatingLight(0xFFFFFF, 2, 100, {
  x: -40.00000000990247,
  y: 99.9933845715949,
  z: 0.2264628736384653,
});
const light2 = lightController2.getRotationCenter();

const lightController3 = new RotatingLight(0xFFFFFF, 2, 100, {
  x: -40.00000000990247,
  y: 69.9933845715949,
  z: 0.2264628736384653,
});
const light3 = lightController2.getRotationCenter();

const dynamicLights = [light1, light2, light3];

// Lightings

const particlesMesh = createParticles(50000, 0.3);

// Variables and arrays needed for animation
const objects = [
  ...staticLights,
  ...dynamicLights,
  particlesMesh,
];
objects.forEach((o) => scene.add(o));

let currentModel = cpu; // undefined
let currentOption = 'CPU';
let previousOption = currentOption;

const gltfModels = [cpu, gpu, motherboard, ram, nvmessd, satassd, psu, hdd];
const tl = gsap.timeline();

// Framerate
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Initial orbit config
orbit.target.set(-40.00000000990247, 99.9933845715949, 0.2264628736384653);
orbit.saveState();

// Raycaster
const rayCaster = new Raycaster();
const pointer = new Vector3();

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
function rayCasterOnPointerMove(event) {
  pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
  pointer.unproject(camera);
}

function animate() {
  stats.begin();

  rayCaster.setFromCamera(pointer, camera);

  requestAnimationFrame(animate);

  updateModel(currentOption);

  if (orbit !== undefined) {
    orbit.update();
  }

  light1.rotateY(speed1);
  light2.rotateY(speed2);
  light3.rotateY(speed3);


  // testing
  // if (!psu.meshIsLoading()) {
  //   console.log(psu.getMeshPos().center);
  // }

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

    if (orbit !== undefined) {
      orbit.reset();
    }
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

        let x, y1, y2, y3, z;
        switch (currentModel.name) {
          case 'CPU':
            x = -40.00000000990247;
            y1 = 129.9933845715949;
            y2 = 99.9933845715949;
            y3 = 69.9933845715949;
            z = 0.2264628736384653;
            break;
          case 'GPU':
            x = -10.00000000990247;
            y1 = 95.9933845715949;
            y2 = 75.9933845715949;
            y3 = 55.9933845715949;
            z = -52.22646287363846;
            break;
          case 'Motherboard':
            x = 60.00818704844004;
            y1 = 55.01117376876935;
            y2 = 45.01117376876935;
            y3 = 35.01117376876935;
            z = 0.1431921523576789;
            break;
          case 'RAM':
            x = 70.043272027080775;
            y1 = -56.545084260133066;
            y2 = -46.545084260133066;
            y3 = -36.545084260133066;
            z = -0.03673524187842103;
            break;
          case 'M.2 NVME SSD':
            x = 54.98586440086365;
            y1 = -108.33843053250085;
            y2 = -98.33843053250085;
            y3 = -88.33843053250085;
            z = 0.5489640127665162;
            break;
          case 'SATA SSD':
            x = -90.09547377084421;
            y1 = -109.79000000469387;
            y2 = -99.79000000469387;
            y3 = -89.79000000469387;
            z = -3.6185678447497494;
            break;
          case 'HDD':
            x = -79.95911570914126;
            y1 = -72.113112069453976;
            y2 = -52.113112069453976;
            y3 = -32.113112069453976;
            z = -14.053495301547436;
            break;
          case 'PSU':
            x = -79.7655963865475;
            y1 = 69.89340925216675;
            y2 = 49.89340925216675;
            y3 = 29.89340925216675;
            z = -0.7249465611647697;
            break;
          default:
            break;
        }

        lightController1.setLightPosition(x, y1, z);
        lightController2.setLightPosition(x, y2, z);
        lightController3.setLightPosition(x, y3, z);
      },
    });

    previousOption = currentOption;
  }
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

window.addEventListener('pointermove', rayCasterOnPointerMove);

// cahaya mengecil dan membesar
