class Model {
  constructor() {
    this.cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);
    this.cubeVao = twgl.createVAOFromBufferInfo(
      gl,
      meshProgramInfo,
      cubeBufferInfo
    );
    this.cubeUniforms = {
      u_colorMult: [Math.random(), Math.random(), Math.random(), Math.random()],
      u_matrix: m4.identity(),
    };

    this.translations = {
      x: 0,
      y: 0,
      z: 0,
      r,
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
    return matrix;
  }
}
