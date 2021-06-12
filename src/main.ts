import { Opponents } from "./game/opponents";
import { Stream } from "./game/stream";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

let elMap: { [id: string]: { elem: HTMLDivElement; x?: number } } = {};

const dividers = new Stream({
  gap: 70,
  onAdd(id) {
    let element = document.createElement("div");

    element.style.position = "absolute";
    element.style.backgroundColor = "white";
    element.style.width = "10px";
    element.style.height = "40px";

    elMap[id] = { elem: element, x: 200 - 5 };

    app.appendChild(element);
  },
  onRemove(id) {
    elMap[id].elem?.remove();
    delete elMap[id];
  },
  height: 600,
  step: 1,
});
const opponents = new Opponents({
  gap: 100,
  step: 3,
  height: 600,
  width: 400,
  onAdd: (id) => {
    let element = document.createElement("div");

    element.style.position = "absolute";
    element.style.backgroundColor = "red";
    element.style.width = "40px";
    element.style.height = "50px";

    elMap[id] = { elem: element };

    app.appendChild(element);
  },
  onRemove: (id) => {
    elMap[id].elem?.remove();
    delete elMap[id];
  },
});

const func = () => {
  dividers.tick();
  dividers.getItems().forEach(({ id, y }) => {
    const { elem, x } = elMap[id];
    elem.style.left = `${x}px`;
    elem.style.top = `${y}px`;
  });

  opponents.tick();
  opponents.getOpponents().forEach(({ id, x, y }) => {
    const { elem } = elMap[id];
    elem.style.left = `${x - 20}px`;
    elem.style.top = `${y}px`;
  });

  requestAnimationFrame(func);
};

func();
