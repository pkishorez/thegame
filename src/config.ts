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
    gap: 300,
    step: 3,
    myCarStep: 10,
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

const game = datconfig.addFolder("game");
game.add(GameConfig.arena, "width").min(100).max(600);
game.add(GameConfig.arena, "height").min(100).max(1000);

const dividers = datconfig.addFolder("dividers");
dividers.add(GameConfig.divider, "width").min(10).max(500);
dividers.add(GameConfig.divider, "height").min(10).max(500);
dividers.add(GameConfig.divider, "gap").min(10).max(500);
dividers.add(GameConfig.divider, "step").min(1).max(20);

const cars = datconfig.addFolder("cars");
cars.add(GameConfig.car, "width").min(10).max(100);
cars.add(GameConfig.car, "height").min(10).max(200);
cars.add(GameConfig.car, "gap").min(10).max(500);
cars.add(GameConfig.car, "step").min(1).max(20);
