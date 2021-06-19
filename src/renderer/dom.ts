export const renderOpponent = (elem?: HTMLDivElement) => {
  let element = elem ?? document.createElement("div");

  element.style.position = "absolute";
  element.style.backgroundColor = "pink";

  return element;
};

export const renderCar = (elem?: HTMLDivElement) => {
  let element = elem ?? document.createElement("div");

  element.style.position = "absolute";
  element.style.backgroundColor = "yellow";

  return element;
};

export const renderDivider = (elem?: HTMLDivElement) => {
  let element = elem ?? document.createElement("div");

  element.style.position = "absolute";
  element.style.backgroundColor = "white";

  return element;
};
