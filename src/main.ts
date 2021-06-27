import { GameConfig, onChange } from "./config";
import { Divider } from "./game/dividers";
import { MyCar } from "./game/mycar";
import { Opponents } from "./game/opponents";
import { renderDivider, renderOpponent } from "./renderer/dom";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

let elMap: { [id: string]: HTMLDivElement | undefined } = {};
onChange(() => {
  Object.entries(elMap).forEach(([key, val]) => {
    val && val.remove();
    delete elMap[key];
  });
});

const dividers = new Divider(GameConfig);

const opponents = new Opponents(GameConfig);

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
  dividers.getItems().forEach(({ id, y, x }) => {
    const { height, width } = GameConfig.divider;

    let elem = elMap[id];
    if (!elem) {
      const div = document.createElement("div");
      elem = renderDivider(div);
      elMap[id] = div;
      app.append(elem);
    }

    elem.style.transform = `translate(${x}px, ${y}px)`;
    elem.style.width = `${width}px`;
    elem.style.height = `${height}px`;
  });

  // Update Opponents.
  opponents.setConfig(GameConfig);
  opponents.tick();
  opponents.getOpponents().forEach(({ id, x, y }) => {
    const { height, width } = GameConfig.car;

    let opponent = elMap[id];

    if (!opponent) {
      const div = document.createElement("div");
      opponent = renderOpponent(div);
      elMap[id] = div;
      app.append(opponent);
    }
    opponent.style.backgroundColor = GameConfig.opponent.color;
    opponent.style.transform = `translate(${x - width / 2}px, ${y}px)`;
    opponent.style.width = `${width}px`;
    opponent.style.height = `${height}px`;
  });

  // Update my car
  mycar.setConfig(GameConfig);
  mycar.tick();
  const { x, y } = mycar.getDimensions();
  mycardiv.style.width = `${GameConfig.car.width}px`;
  mycardiv.style.height = `${GameConfig.car.height}px`;
  mycardiv.style.backgroundColor = GameConfig.mycar.color;
  mycardiv.style.transform = `translate(${
    x - GameConfig.car.width / 2
  }px, ${y}px)`;

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
