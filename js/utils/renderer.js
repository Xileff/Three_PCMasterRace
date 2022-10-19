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

const makeResponsive = (container, renderer, camera) => {
    let height, width

    const resizeObserver = new ResizeObserver(() => {
        console.log(container.domElement)
    })

    resizeObserver.observe(container.domElement)
    // if(container instanceof Window){
    //     container.addEventListener('resize', function() {
    //         width = container.innerWidth
    //         height = container.innerHeight
    //     })
    // }

    // else {
    //     let resizeObserver =  new ResizeObserver(() => {
    //         width = container.clientWidth
    //         height = container.clientHeight
    //     })

    //     resizeObserver.observe(container)
    // }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    // container.addEventListener('resize', function () {
    //     let height, width
    //     if(this instanceof Window){
    //         height = this.innerHeight  
    //         width = this.innerWidth
    //         console.log('Window')
    //     } else {
    //         height = this.clientHeight
    //         width = this.clientWidth
    //         console.log('Not Window')
    //     }

    //     camera.aspect = width / height;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(width, height);
    // })
}

export { createRenderer, makeResponsive };