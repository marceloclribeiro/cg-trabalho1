class Model {
  constructor() {
    this.bufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);
    this.setVao(gl, meshProgramInfo);
    this.setUniforms();

    this.translate = {
      x: random(),
      y: random() / 2,
      z: random() / 10,
      r: 0,
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

    this.scale = {
      x: 1,
      y: 1,
      z: 1,
    };

    this.animationParams = {
      type: "translation",
      axis: "x",
      value: 0,
      distance: 0,
    };

    this.animationsArray = [];

    this.target = false;
  }

  setVao() {
    this.vao = twgl.createVAOFromBufferInfo(
      gl,
      meshProgramInfo,
      this.bufferInfo
    );
  }

  setUniforms() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    this.uniforms = {
      u_colorMult: [r, g, b, 1],
      u_matrix: m4.identity,
    };
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

  computeMatrix(
    viewProjectionMatrix,
    translation,
    xRotation,
    yRotation,
    zRotation,
    xScale,
    yScale,
    zScale
  ) {
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2]
    );
    matrix = m4.xRotate(matrix, degToRad(xRotation));
    matrix = m4.yRotate(matrix, degToRad(yRotation));
    matrix = m4.zRotate(matrix, degToRad(zRotation));
    matrix = m4.scale(matrix, xScale, yScale, zScale);

    matrix = this.pointRotate(matrix, this.pRotate.distance);
    this.uniforms.u_matrix = matrix;
  }
  drawModel(viewProjectionMatrix) {
    if (this.target) {
      cameras[manageCamera.index].target.x = this.translate.x;
      cameras[manageCamera.index].target.y = this.translate.y;
      cameras[manageCamera.index].target.z = this.translate.z;
    }
    gl.bindVertexArray(this.vao);
    this.computeMatrix(
      viewProjectionMatrix,
      objectToVector(this.translate),
      this.rotate.x,
      this.rotate.y,
      this.rotate.z,
      this.scale.x,
      this.scale.y,
      this.scale.z
    );
    twgl.setUniforms(meshProgramInfo, this.uniforms);
    twgl.drawBufferInfo(gl, this.bufferInfo);
  }
}
