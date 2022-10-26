import { WebGLRenderer } from 'three';

const createRenderer = (width, height, color) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.shadowMap.enabled = true;
  renderer.setClearColor(color, 1);
  renderer.setSize(width, height);

  return renderer;
};

const makeResponsiveWindow = (window, renderer, camera) => {
  window.addEventListener('resize', function () {
    let height, width;
    if (this instanceof Window) {
      height = this.innerHeight;
      width = this.innerWidth;
    } else {
      height = this.clientHeight;
      width = this.clientWidth;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
};

const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};

const makeResponsiveNonWindow = (renderer, camera) => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
};

export { createRenderer, makeResponsiveWindow, makeResponsiveNonWindow };
