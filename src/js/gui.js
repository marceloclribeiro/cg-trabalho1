var config = {
  rotateX: degToRad(20),
  rotateY: degToRad(20),
  rotateZ: degToRad(20),
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  translateCameraX: 0,
};

const loadGUI = () => {
  const gui = new dat.GUI();
  gui.add(config, "rotateX", 0, 20, 0.5);
  gui.add(config, "rotateY", 0, 20, 0.5);
  gui.add(config, "rotateZ", 0, 20, 0.5);
  gui.add(config, "translateX", -100, 100, 0.5);
  gui.add(config, "translateY", -100, 100, 0.5);
  gui.add(config, "translateZ", -100, 100, 0.5);
  gui.add(config, "scaleX", -5, 5, 0.5);
  gui.add(config, "scaleY", -5, 5, 0.5);
  gui.add(config, "scaleZ", -5, 5, 0.5);
  gui.add(config, "translateCameraX", -100, 100, 0.5);
};
