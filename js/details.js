// Libraries
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

// Objects
import Cube from './objects/Cube'

// Utils
import { createOrbit } from './utils/orbitControl'
import { createPerspectiveCamera } from './utils/perspectiveCamera'
import { createRenderer, makeResponsiveNonWindow } from './utils/renderer'
import { createScene } from './utils/scene'

// Preparation
const canvasContainer = document.getElementById('canvasContainer')

const renderer = createRenderer(canvasContainer.clientWidth, canvasContainer.clientHeight, 0x000000)
const scene = createScene()
const camera = createPerspectiveCamera(120, canvasContainer.clientWidth /  canvasContainer.clientHeight, 0.1, 1000)
const orbit = createOrbit(camera, renderer.domElement)


const cube = new Cube(2, {x: 0, y: 0, z: 0}, 0x0000ff)

// Put all objects in array and then start the animation
const objects = [
    cube.mesh
]

objects.forEach(o => scene.add(o))

start()




// Functions
function start() {
    camera.position.z = 3
    renderer.domElement.classList.add('w-100', 'h-100')
    canvasContainer.appendChild(renderer.domElement)
    
    renderer.render(scene, camera)
    animate()
    makeResponsiveNonWindow(renderer, camera)
}

function animate(){
    requestAnimationFrame(animate)

    orbit.update()
    cube.animate()

    renderer.render(scene, camera)
}