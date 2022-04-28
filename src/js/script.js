/*
  Proximos passos:
  -camera

  -dividir a animação em dois passos: adicionar animação e animar.
  -limpar animação



  -rodar em um ponto
  -translação curva


*/

const models = [];
const cameras = [new Camera([0, 0, 100], [0, 0, 0], [0, 1, 0])];
cameras.push(new Camera([50, 50, 100], [50, 50, 0], [0, 1, 0]));
cameras.push(new Camera([-20, -20, 100], [-20, -20, 0], [0, 1, 0]));
// var cameraPosition = [0, 0, 100];
// var target = [0, 0, 0];
function main() {
  var fieldOfViewRadians = degToRad(60);

  loadGUI();
  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.

    // var up = [0, 1, 0];
    // var cameraMatrix = m4.lookAt(cameraPosition, target, up);
    // console.log(cameraMatrix);

    // if (config.focus) {
    //   cameraPosition = [config.translateX, config.translateY, 100];
    //   target = [config.translateX, config.translateY, 0];
    // } else {
    //   cameraPosition = [0, 0, 100];
    //   target = [0, 0, 0];
    // }

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameras[manageCamera.index].cameraMatrix);

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
