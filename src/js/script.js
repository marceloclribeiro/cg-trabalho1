const models = [];
const cameras = [new Camera([0, 0, 100], [0, 0, 0], [0, 1, 0])];
cameras.push(new Camera([50, 50, 100], [50, 50, 0], [0, 1, 0]));
cameras.push(new Camera([-20, -20, 100], [-20, -20, 0], [0, 1, 0]));

function main() {
  var fieldOfViewRadians = degToRad(60);

  loadGUI();
  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    fieldOfViewRadians = degToRad(60 - cameras[manageCamera.index].zoom);
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    var viewMatrix = m4.inverse(cameras[manageCamera.index].computeMatrix());

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    models.forEach((model) => {
      if (model) {
        model.drawModel(viewProjectionMatrix);
      }
    });
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
