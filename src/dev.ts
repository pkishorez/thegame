import gui from "dat.gui";
import { GameConfig } from "./config";

export const config: GameConfig = {
  arena: {
    width: 200,
    height: 600,
    lanes: 10,
  },
  car: {
    width: 10,
    height: 25,
  },
  opponent: {
    gap: 300,
    step: 3,
    color: "#f0f003",
  },
  mycar: {
    step: 5,
    color: "#00f0f0",
  },
  divider: {
    width: 2,
    height: 30,
    gap: 50,
    step: 1,
  },
};

const datconfig = new gui.GUI({
  preset: "thegame",
});
datconfig.close();

let _onFinish: () => void;

export const onChange = (func: () => void) => {
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
game.add(config.arena, "lanes").min(2).max(10).step(1).onFinishChange(onFinish);

// Dividers Config.
const dividers = datconfig.addFolder("dividers");
dividers.add(config.divider, "width").min(1).max(100).onFinishChange(onFinish);
dividers.add(config.divider, "height").min(1).max(100).onFinishChange(onFinish);
dividers.add(config.divider, "gap").min(1).max(100).onFinishChange(onFinish);
dividers.add(config.divider, "step").min(1).max(100).onFinishChange(onFinish);

// Cars Config.
const cars = datconfig.addFolder("cars");
cars.add(config.car, "width").min(1).max(200).onFinishChange(onFinish);
cars.add(config.car, "height").min(1).max(200).onFinishChange(onFinish);

const opponents = datconfig.addFolder("opponent");
opponents.add(config.opponent, "gap").min(1).max(200).onFinishChange(onFinish);

opponents.addColor(config.opponent, "color").onFinishChange(onFinish);

// MyCar Config.
const mycar = datconfig.addFolder("mycar");
mycar.addColor(config.mycar, "color").onFinishChange(onFinish);

// Speed.
const speed = datconfig.addFolder("speed");
speed
  .add(config.divider, "step")
  .name("Dividers")
  .min(1)
  .max(20)
  .onFinishChange(onFinish);
speed
  .add(config.opponent, "step")
  .name("Opponent")
  .min(1)
  .max(20)
  .onFinishChange(onFinish);
speed
  .add(config.mycar, "step")
  .name("My Car")
  .min(1)
  .max(200)
  .onFinishChange(onFinish);

// datconfig.open();
