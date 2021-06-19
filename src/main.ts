import { GameConfig } from "./config";
import { Divider } from "./game/dividers";
import { MyCar } from "./game/mycar";
import { Opponents } from "./game/opponents";
import { renderDivider, renderOpponent } from "./renderer/dom";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

let elMap: { [id: string]: HTMLDivElement } = {};

const dividers = new Divider(GameConfig, {
  onAdd(id) {
    elMap[id] = renderDivider();
    app.appendChild(elMap[id]);
  },
  onRemove(id) {
    elMap[id].remove();
    delete elMap[id];
  },
});

const opponents = new Opponents(GameConfig, {
  onAdd: (id) => {
    elMap[id] = renderOpponent();
    app.appendChild(elMap[id]);
  },
  onRemove: (id) => {
    elMap[id].remove();
    delete elMap[id];
  },
});

const mycar = new MyCar(GameConfig);
const mycardiv = document.createElement("div");
mycardiv.style.position = "absolute";
app.append(mycardiv);

const tick = () => {
  // Update game dimensions.
  app.style.width = `${GameConfig.arena.width}px`;
  app.style.height = `${GameConfig.arena.height}px`;

  // Update dividers.
  dividers.setConfig(GameConfig);
  dividers.tick();
  dividers.getItems().forEach(({ id, y }) => {
    const { height, width } = GameConfig.divider;

    const elem = elMap[id];
    elem.style.left = `${GameConfig.arena.width / 2 - width / 2}px`;
    elem.style.top = `${y}px`;
    elem.style.width = `${width}px`;
    elem.style.height = `${height}px`;
  });

  // Update Opponents.
  opponents.setConfig(GameConfig);
  opponents.tick();
  opponents.getOpponents().forEach(({ id, x, y }) => {
    const { height, width } = GameConfig.car;

    const elem = elMap[id];
    elem.style.left = `${x - width / 2}px`;
    elem.style.top = `${y}px`;
    elem.style.width = `${width}px`;
    elem.style.height = `${height}px`;
  });

  // Update my car
  mycar.setConfig(GameConfig);
  mycar.tick();
  const { x, y } = mycar.getDimensions();
  mycardiv.style.width = `${GameConfig.car.width}px`;
  mycardiv.style.height = `${GameConfig.car.height}px`;
  mycardiv.style.backgroundColor = "teal";
  mycardiv.style.left = `${x - GameConfig.car.width / 2}px`;
  mycardiv.style.top = `${y}px`;

  requestAnimationFrame(tick);
};

function setup() {
  window.addEventListener("keydown", (ev) => {
    switch (ev.key) {
      case "ArrowLeft": {
        mycar.moveLeft();
        break;
      }
      case "ArrowRight": {
        mycar.moveRight();
        break;
      }
    }
  });

  tick();
}

setup();
