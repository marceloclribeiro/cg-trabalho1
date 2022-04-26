class Model {
  constructor() {
    this.gl = gl;
    this.meshProgramInfo = meshProgramInfo;
    this.bufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);
    this.setVao(gl, this.meshProgramInfo);
    this.setUniforms();

    this.translations = {
      x: 0,
      y: 0,
      z: 0,
      r: 0,
    };
  }

  setVao() {
    this.vao = twgl.createVAOFromBufferInfo(
      this.gl,
      this.meshProgramInfo,
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
    matrix = m4.xRotate(matrix, xRotation);
    matrix = m4.yRotate(matrix, yRotation);
    matrix = m4.zRotate(matrix, zRotation);
    matrix = m4.scale(matrix, xScale, yScale, zScale);
    this.uniforms.u_matrix = matrix;
  }
  drawModel(viewProjectionMatrix) {
    this.gl.bindVertexArray(this.vao);
    this.computeMatrix(
      viewProjectionMatrix,
      [this.translations.x, config.translateY, config.translateZ],
      config.rotateX,
      config.rotateY,
      config.rotateZ,
      config.scaleX,
      config.scaleY,
      config.scaleZ
    );
    twgl.setUniforms(this.meshProgramInfo, this.uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }
}
