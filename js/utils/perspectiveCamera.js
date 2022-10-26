/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { PerspectiveCamera } from 'three';

const createPerspectiveCamera = (fov, aspectRatio, near, far) => new PerspectiveCamera(fov, aspectRatio, near, far);

export { createPerspectiveCamera };
