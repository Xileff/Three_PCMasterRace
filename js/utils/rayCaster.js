// RayCaster for detecting when user clicks the PC to view details

import { Raycaster, Vector2 } from "three";

const mousePosition = new Vector2()

window.addEventListener('mousemove', e => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
    mousePosition.y = (e.clientY / window.innerHeight) * 2 + 1
})

const rayCaster = new Raycaster()