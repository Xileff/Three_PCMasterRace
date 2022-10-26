const rotateX = (object, speed) => {
  object.rotation.x += speed;
};
const rotateY = (object, speed) => {
  object.rotation.y += speed;
};
const rotateZ = (object, speed) => {
  object.rotation.z += speed;
};

export { rotateX, rotateY, rotateZ };
