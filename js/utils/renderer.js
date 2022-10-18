import { WebGLRenderer } from 'three';

const createRenderer = (width, height, color) => {
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
    });
    
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(color, 1)
    renderer.setSize(width, height);

    return renderer;
}

const makeResponsive = (window, renderer, camera) => {
    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    })
}

export { createRenderer, makeResponsive };