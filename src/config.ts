import gui from "dat.gui";
import { IGameConfig } from "./game/config";

export const GameConfig: IGameConfig = {
  arena: {
    width: 200,
    height: 600,
    lanes: 2,
  },
  car: {
    width: 40,
    height: 60,
  },
  opponent: {
    gap: 300,
    step: 3,
    color: "#f0f003",
  },
  mycar: {
    step: 10,
    color: "#00f0f0",
  },
  divider: {
    width: 10,
    height: 40,
    gap: 50,
    step: 1,
  },
};

const datconfig = new gui.GUI({
  preset: "thegame",
});
datconfig.open();

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
game.add(GameConfig.arena, "width").min(100).max(600).onFinishChange(onFinish);
game
  .add(GameConfig.arena, "height")
  .min(100)
  .max(1000)
  .onFinishChange(onFinish);
game
  .add(GameConfig.arena, "lanes")
  .min(2)
  .max(10)
  .step(1)
  .onFinishChange(onFinish);

// Dividers Config.
const dividers = datconfig.addFolder("dividers");
dividers
  .add(GameConfig.divider, "width")
  .min(1)
  .max(100)
  .onFinishChange(onFinish);
dividers
  .add(GameConfig.divider, "height")
  .min(1)
  .max(100)
  .onFinishChange(onFinish);
dividers
  .add(GameConfig.divider, "gap")
  .min(1)
  .max(100)
  .onFinishChange(onFinish);

// Cars Config.
const cars = datconfig.addFolder("cars");
cars.add(GameConfig.car, "width").min(1).max(200).onFinishChange(onFinish);
cars.add(GameConfig.car, "height").min(1).max(200).onFinishChange(onFinish);

const opponents = datconfig.addFolder("opponent");
opponents
  .add(GameConfig.opponent, "gap")
  .min(1)
  .max(200)
  .onFinishChange(onFinish);

opponents.addColor(GameConfig.opponent, "color").onFinishChange(onFinish);

// MyCar Config.
const mycar = datconfig.addFolder("mycar");
mycar.addColor(GameConfig.mycar, "color").onFinishChange(onFinish);

// Speed.
const speed = datconfig.addFolder("speed");
speed
  .add(GameConfig.divider, "step")
  .name("Dividers")
  .min(1)
  .max(20)
  .onFinishChange(onFinish);
speed
  .add(GameConfig.opponent, "step")
  .name("Opponent")
  .min(1)
  .max(20)
  .onFinishChange(onFinish);
speed
  .add(GameConfig.mycar, "step")
  .name("My Car")
  .min(1)
  .max(200)
  .onFinishChange(onFinish);
