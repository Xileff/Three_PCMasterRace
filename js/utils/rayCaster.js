// Ini belom dipake

const updateCoordinates = mousePosition => {
    window.addEventListener('mousemove', e => {
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
        mousePosition.y = (e.clientY / window.innerHeight) * 2 + 1
    })  
}

const gltfClickAction = (rayCaster, intersects, target, callbackFn) => {
    // what to do when gltf object clicked
}

const meshClickAction = (rayCaster, intersects, target, callbackFn) => {
    // what to do when normal mesh clicked
}

export { updateCoordinates, gltfClickAction, meshClickAction }