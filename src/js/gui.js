var config = {
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  translateCameraX: 0,
  focus: false,
};
const manageCamera = {
  index: 0,
};
const loadGUI = () => {
  const gui = new dat.GUI();

  const manageModels = {
    addModel: () => {
      models.push(new Model());
    },
    deleteModel: () => {},
    modelIndex: 0,
  };

  gui
    .add(manageModels, "addModel")
    .name("Add model")
    .onChange(() => setTimeout(() => addModelController()));

  const cameraFolder = gui.addFolder("Camera");
  cameraFolder
    .add(manageCamera, "index")
    .options([0, 1, 2])
    .onChange(() => addCameraFolders());

  addCameraFolders();

  const modelsFolder = gui.addFolder("Models");

  function addCameraFolders() {
    if (gui.__folders.Camera.__folders.Translations) {
      cameraFolder.removeFolder(gui.__folders.Camera.__folders.Animations);
      cameraFolder.removeFolder(gui.__folders.Camera.__folders.Translations);
      cameraFolder.removeFolder(gui.__folders.Camera.__folders.Rotations);
      cameraFolder.removeFolder(gui.__folders.Camera.__folders.pRotation);
      cameraFolder.removeFolder(gui.__folders.Camera.__folders.Target);
      cameraFolder.remove(zoom);
    }
    camera = cameras[manageCamera.index];

    const animationsFolder = cameraFolder.addFolder("Animations");
    animationsFolder
      .add(camera.animationParams, "type")
      .options(["translation", "rotation", "point rotation"]);
    animationsFolder
      .add(camera.animationParams, "axis")
      .options(["x", "y", "z"]);
    animationsFolder.add(camera.animationParams, "value", -360, 360, 1);
    animationsFolder.add(camera.animationParams, "distance", -100, 100, 1);
    animationsFolder.add(camera, "animations").name("Add Animation");
    animationsFolder.add(camera, "animate").name("Animate");

    const cameraTranslations = cameraFolder.addFolder("Translations");
    cameraTranslations.add(camera.translate, "x", -100, 100, 1);
    cameraTranslations.add(camera.translate, "y", -100, 100, 1);
    cameraTranslations.add(camera.translate, "z", -100, 100, 1);

    const cameraRotations = cameraFolder.addFolder("Rotations");
    cameraRotations.add(camera.rotate, "x", 0, 360, 1);
    cameraRotations.add(camera.rotate, "y", 0, 360, 1);
    cameraRotations.add(camera.rotate, "z", 0, 360, 1);

    const cameraPRotations = cameraFolder.addFolder("pRotation");
    cameraPRotations.add(camera.pRotate, "axis").options(["x", "y", "z"]);
    cameraPRotations.add(camera.pRotate, "distance", -100, 100, 1);
    cameraPRotations.add(camera.pRotate, "angle", -360, 360, 1);

    const cameraTarget = cameraFolder.addFolder("Target");
    cameraTarget.add(camera.target, "x", -100, 100, 1);
    cameraTarget.add(camera.target, "y", -100, 100, 1);
    cameraTarget.add(camera.target, "z", -100, 100, 1);

    zoom = cameraFolder.add(camera, "zoom", 0, 60, 1).name("Zoom").listen();
  }

  function addModelController() {
    var index = manageModels.modelIndex;
    manageModels.modelIndex += 1;
    const model = models[models.length - 1];
    var modelFolder = modelsFolder.addFolder("Model" + index);

    const animationsFolder = modelFolder.addFolder("Animations");
    animationsFolder
      .add(model.animationParams, "type")
      .options(["translation", "rotation", "point rotation"]);
    animationsFolder
      .add(model.animationParams, "axis")
      .options(["x", "y", "z"]);
    animationsFolder.add(model.animationParams, "value", -360, 360, 1);
    animationsFolder.add(model.animationParams, "distance", -100, 100, 1);
    animationsFolder.add(model, "animations").name("Add Animation");
    animationsFolder.add(model, "animate").name("Animate");

    const modelTranslations = modelFolder.addFolder("Translations");
    modelTranslations.add(model.translate, "x", -100, 100, 1);
    modelTranslations.add(model.translate, "y", -100, 100, 1);
    modelTranslations.add(model.translate, "z", -100, 100, 1);

    const modelRotations = modelFolder.addFolder("Rotations");
    modelRotations.add(model.rotate, "x", 0, 360, 1);
    modelRotations.add(model.rotate, "y", 0, 360, 1);
    modelRotations.add(model.rotate, "z", 0, 360, 1);

    const modelPRotations = modelFolder.addFolder("Point rotation");
    modelPRotations.add(model.pRotate, "axis").options(["x", "y", "z"]);
    modelPRotations.add(model.pRotate, "distance", -100, 100, 1);
    modelPRotations.add(model.pRotate, "angle", -360, 360, 1);

    const modelScale = modelFolder.addFolder("Scale");
    modelScale.add(model.scale, "x", -5, 5, 0.5);
    modelScale.add(model.scale, "y", -5, 5, 0.5);
    modelScale.add(model.scale, "z", -5, 5, 0.5);

    modelFolder.add(model, "target").name("Focus");

    modelFolder
      .add(manageModels, "deleteModel")
      .name("Delete model")
      .onChange(() => {
        modelsFolder.removeFolder(modelFolder);
        models.splice(models.indexOf(model), 1);
      });
  }
};
