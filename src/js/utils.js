const degToRad = (d) => (d * Math.PI) / 180;

const radToDeg = (r) => (r * 180) / Math.PI;

const random = () => Math.random() * 200 - 100;

const checkAxis = (object, axis, value) => {
  obj = object;
  switch (axis) {
    case "x":
      obj.x += value / Math.abs(value);
      break;
    case "y":
      obj.y += value / Math.abs(value);
      break;
    case "z":
      obj.z += value / Math.abs(value);
      break;
    case "angle":
      obj.angle += value / Math.abs(value);
    default:
      break;
  }
  return obj;
};

const objectToVector = (object) => {
  return [object.x, object.y, object.z];
};

const targetModel = () => {
  models.find((model) => model.target == true);
};
