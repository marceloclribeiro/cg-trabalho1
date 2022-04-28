class Camera {
  constructor(position, target, up) {
    this.cameraPosition = position;
    this.target = target;
    this.up = up;

    this.cameraMatrix = m4.lookAt(this.cameraPosition, this.target, this.up);
  }
}
