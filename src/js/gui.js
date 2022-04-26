var config = {
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  translateCameraX: 0,
  focus: false,
};

const manageModels = {
  addModel: () => {
    models.push(new Model());
  },
};
const loadGUI = () => {
  const gui = new dat.GUI();

  gui
    .add(manageModels, "addModel")
    .name("Add model")
    .onChange(() => setTimeout(() => addController()));

  function addController() {
    model = models[models.length - 1];
    const modelFolder = gui.addFolder("Model " + (models.length - 1));

    const guiRotations = modelFolder.addFolder("Rotations");
    const guiTranslations = modelFolder.addFolder("Translations");
    const guiScale = modelFolder.addFolder("Scale");

    guiRotations.add(model.rotate, "x", 0, 20, 0.5);
    guiRotations.add(model.rotate, "y", 0, 20, 0.5);
    guiRotations.add(model.rotate, "z", 0, 20, 0.5);
    guiTranslations.add(model.translations, "x", -100, 100, 0.5).listen();
    guiTranslations.add(model.translations, "y", -100, 100, 0.5).listen();
    guiTranslations.add(model.translations, "z", -100, 100, 0.5).listen();
    guiScale.add(model.scale, "x", -5, 5, 0.5);
    guiScale.add(model.scale, "y", -5, 5, 0.5);
    guiScale.add(model.scale, "z", -5, 5, 0.5);
    guiScale.add(config, "translateCameraX", -100, 100, 0.5);
    gui.add(config, "focus");
  }
};
