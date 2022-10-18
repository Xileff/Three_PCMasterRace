import { PerspectiveCamera } from "three";

const createPerspectiveCamera = (fov, aspectRatio, near, far) => {
    return new PerspectiveCamera(fov, aspectRatio, near, far);
}

export { createPerspectiveCamera };