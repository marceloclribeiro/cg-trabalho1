class Camera {
  constructor(position, target, up) {
    this.translate = {
      x: position[0],
      y: position[1],
      z: position[2],
    };

    this.rotate = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.pRotate = {
      distance: 0,
      angle: 0,
      axis: "x",
    };

    this.target = {
      x: target[0],
      y: target[1],
      z: target[2],
    };
    this.up = up;

    this.cameraMatrix = m4.lookAt(
      objectToVector(this.translate),
      objectToVector(this.target),
      this.up
    );
    this.zoom = 0;

    this.fieldOfView = degToRad(60 - this.zoom);

    this.animationParams = {
      type: "translation",
      axis: "x",
      value: 0,
      distance: 0,
    };

    this.animationsArray = [];
  }

  animations() {
    this.animationsArray.push({
      type: this.animationParams.type,
      axis: this.animationParams.axis,
      value: this.animationParams.value,
      distance: this.animationParams.distance,
    });
  }

  animate() {
    var params;
    var count = 0;
    var index = 0;
    if (this.animationsArray == []) return;
    var interval = setInterval(() => {
      params = this.animationsArray[index];
      if (params.type === "translation")
        this.translate = checkAxis(this.translate, params.axis, params.value);
      if (params.type === "rotation")
        this.rotate = checkAxis(this.rotate, params.axis, params.value);
      if (params.type === "point rotation") {
        this.pRotate = checkAxis(this.pRotate, "angle", params.value);
        this.pRotate.axis = params.axis;
        this.pRotate.distance = params.distance;
      }
      count += 1;
      if (count >= Math.abs(params.value)) {
        count = 0;
        index += 1;
      }
      if (index === this.animationsArray.length) {
        clearInterval(interval);
        this.animationsArray = [];
        return;
      }
    }, 40);
  }

  pointRotate(matrix, distance) {
    {
      matrix = m4.translate(matrix, distance, distance, distance);

      switch (this.pRotate.axis) {
        case "x":
          matrix = m4.xRotate(matrix, degToRad(this.pRotate.angle));
          break;
        case "y":
          matrix = m4.yRotate(matrix, degToRad(this.pRotate.angle));
          break;
        case "z":
          matrix = m4.zRotate(matrix, degToRad(this.pRotate.angle));
          break;
        default:
          break;
      }

      matrix = m4.translate(matrix, -distance, -distance, -distance);

      return matrix;
    }
  }

  computeMatrix() {
    var matrix = this.cameraMatrix;
    matrix = m4.lookAt(
      objectToVector(this.translate),
      objectToVector(this.target),
      this.up
    );
    matrix = m4.xRotate(matrix, degToRad(this.rotate.x));
    matrix = m4.yRotate(matrix, degToRad(this.rotate.y));
    matrix = m4.zRotate(matrix, degToRad(this.rotate.z));

    matrix = this.pointRotate(matrix, this.pRotate.distance);

    return matrix;
  }
}
