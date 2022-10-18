import { AmbientLight } from "three";

const createAmbientLight = color => {
    const ambientLight = new AmbientLight(color)

    return ambientLight;
}

export { createAmbientLight }