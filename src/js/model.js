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

    this.scale = {
      x: 1,
      y: 1,
      z: 1,
    };

    this.animationParams = {
      type: "translation",
      axis: "x",
      value: 0,
    };

    this.animationsArray = [];
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
      count += 1;
      console.log(count);
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
    this.uniforms.u_matrix = matrix;
  }
  drawModel(viewProjectionMatrix) {
    gl.bindVertexArray(this.vao);
    this.computeMatrix(
      viewProjectionMatrix,
      [this.translate.x, this.translate.y, this.translate.z],
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
