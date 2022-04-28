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

const manageCamera = {
  index: 0,
};
const loadGUI = () => {
  const gui = new dat.GUI();

  gui
    .add(manageModels, "addModel")
    .name("Add model")
    .onChange(() => setTimeout(() => addController()));

  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(manageCamera, "index").options([0, 1, 2]);

  function addController() {
    model = models[models.length - 1];
    var modelFolder = gui.addFolder("Model " + (models.length - 1));

    const animationsFolder = modelFolder.addFolder("Animations");
    animationsFolder
      .add(model.animationParams, "type")
      .options(["translation", "rotation"]);
    animationsFolder
      .add(model.animationParams, "axis")
      .options(["x", "y", "z"]);
    animationsFolder.add(model.animationParams, "value", -360, 360, 0.5);
    animationsFolder.add(model, "animations").name("Add Animation");
    animationsFolder.add(model, "animate").name("Animate");

    const guiRotations = modelFolder.addFolder("Rotations");
    const guiTranslations = modelFolder.addFolder("Translations");
    const guiScale = modelFolder.addFolder("Scale");

    guiRotations.add(model.rotate, "x", 0, 360, 0.5);
    guiRotations.add(model.rotate, "y", 0, 360, 0.5);
    guiRotations.add(model.rotate, "z", 0, 360, 0.5);
    guiTranslations.add(model.translate, "x", -100, 100, 0.5);
    guiTranslations.add(model.translate, "y", -100, 100, 0.5);
    guiTranslations.add(model.translate, "z", -100, 100, 0.5);
    guiScale.add(model.scale, "x", -5, 5, 0.5);
    guiScale.add(model.scale, "y", -5, 5, 0.5);
    guiScale.add(model.scale, "z", -5, 5, 0.5);
  }
};
