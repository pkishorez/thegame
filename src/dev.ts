import gui from "dat.gui";
import { GameConfig } from "./config";

export const config: GameConfig = {
  arena: {
    width: 200,
    height: 600,
    lanes: 5,
    buffer: 0,
  },
  car: {
    width: 20,
    height: 40,

    opponent: {
      gap: 300,
      step: 3,
      color: "#f0f003",
    },
    mycar: {
      step: 5,
      color: "#00f0f0",
    },
  },

  divider: {
    width: 2,
    height: 30,
    gap: 50,
    step: 1,
  },

  renderer: {
    canvas: false,
    dom: false,
    react: false,
    three: true,
  },
};

export function setupDev() {
  const datconfig = new gui.GUI({
    preset: "thegame",
  });
  datconfig.close();

  let _onFinish: () => void;

  const onChange = (func: () => void) => {
    _onFinish = func;
  };
  const onFinish = () => {
    if (_onFinish) {
      _onFinish();
    }
  };

  // Game Config.
  const game = datconfig.addFolder("game");
  game.add(config.arena, "width").min(100).max(600).onFinishChange(onFinish);
  game.add(config.arena, "height").min(100).max(1000).onFinishChange(onFinish);
  game
    .add(config.arena, "lanes")
    .min(2)
    .max(10)
    .step(1)
    .onFinishChange(onFinish);

  // Dividers Config.
  const dividers = datconfig.addFolder("dividers");
  dividers
    .add(config.divider, "width")
    .min(1)
    .max(100)
    .onFinishChange(onFinish);
  dividers
    .add(config.divider, "height")
    .min(1)
    .max(100)
    .onFinishChange(onFinish);
  dividers.add(config.divider, "gap").min(1).max(100).onFinishChange(onFinish);
  dividers.add(config.divider, "step").min(1).max(100).onFinishChange(onFinish);

  // Cars Config.
  const cars = datconfig.addFolder("cars");
  cars.add(config.car, "width").min(1).max(200).onFinishChange(onFinish);
  cars.add(config.car, "height").min(1).max(200).onFinishChange(onFinish);

  const opponents = datconfig.addFolder("opponent");
  opponents
    .add(config.car.opponent, "gap")
    .min(1)
    .max(200)
    .onFinishChange(onFinish);

  opponents.addColor(config.car.opponent, "color").onFinishChange(onFinish);

  // MyCar Config.
  const mycar = datconfig.addFolder("mycar");
  mycar.addColor(config.car.mycar, "color").onFinishChange(onFinish);

  // Speed.
  const speed = datconfig.addFolder("speed");
  speed
    .add(config.divider, "step")
    .name("Dividers")
    .min(1)
    .max(20)
    .onFinishChange(onFinish);
  speed
    .add(config.car.opponent, "step")
    .name("Opponent")
    .min(1)
    .max(20)
    .onFinishChange(onFinish);
  speed
    .add(config.car.mycar, "step")
    .name("My Car")
    .min(1)
    .max(200)
    .onFinishChange(onFinish);

  const renderer = datconfig.addFolder("renderer");
  renderer
    .add(config.renderer, "canvas")
    .name("Canvas")
    .onFinishChange(onFinish);
  renderer.add(config.renderer, "dom").name("DOM").onFinishChange(onFinish);
  renderer.add(config.renderer, "react").name("REACT").onFinishChange(onFinish);
  renderer.add(config.renderer, "three").name("THREE").onFinishChange(onFinish);

  return { onChange };
}
