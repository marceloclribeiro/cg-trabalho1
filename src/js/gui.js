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
  focus: false,
};

const loadGUI = () => {
  const gui = new dat.GUI();
  const guiElement = gui.addFolder("Element");
  const guiRotations = guiElement.addFolder("Rotations");
  const guiTranslations = guiElement.addFolder("Translations");
  const guiScale = guiElement.addFolder("Scale");

  guiRotations.add(config, "rotateX", 0, 20, 0.5);
  guiRotations.add(config, "rotateY", 0, 20, 0.5);
  guiRotations.add(config, "rotateZ", 0, 20, 0.5);
  guiTranslations.add(models[0].translations, "x", -100, 100, 0.5);
  guiTranslations.add(config, "translateY", -100, 100, 0.5);
  guiTranslations.add(config, "translateZ", -100, 100, 0.5);
  guiScale.add(config, "scaleX", -5, 5, 0.5);
  guiScale.add(config, "scaleY", -5, 5, 0.5);
  guiScale.add(config, "scaleZ", -5, 5, 0.5);
  guiScale.add(config, "translateCameraX", -100, 100, 0.5);
  gui.add(config, "focus");
};
