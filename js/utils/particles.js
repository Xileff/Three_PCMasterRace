import {
  BufferAttribute, BufferGeometry, Points, PointsMaterial, TextureLoader,
} from 'three';

const loader = new TextureLoader();

const createParticles = (count, size) => {
  const particlesGeometry = new BufferGeometry();
  const particlesCount = count;
  const posArray = new Float32Array(particlesCount * 3);
  const material = new PointsMaterial({
    size,
    map: loader.load('/images/stars.png'),
    transparent: true,
  });

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 500);
  }

  const particlesMesh = new Points(particlesGeometry, material);

  particlesGeometry.setAttribute('position', new BufferAttribute(posArray, 3));

  return particlesMesh;
};

const animateParticle = (particlesMesh) => {
  particlesMesh.rotation.x += 0.0005;
  particlesMesh.rotation.y -= 0.0005;
};

export { createParticles, animateParticle };
