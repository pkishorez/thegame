import { GameConfig } from "../../config";
import { Dividers } from "./dividers";
import { MyCar } from "./mycar";
import { Opponents } from "./opponents";

export type EngineState = ReturnType<GameEngine["getState"]>;

export class GameEngine {
  config: GameConfig;
  dividers!: Dividers;
  mycar!: MyCar;
  opponents!: Opponents;

  constructor(config: GameConfig) {
    this.config = config;

    this.dividers = new Dividers(this.config);
    this.mycar = new MyCar(this.config);
    this.opponents = new Opponents(this.config);
  }

  setConfig(config: GameConfig) {
    this.config = config;
    this.dividers.setConfig(config);
    this.mycar.setConfig(config);
    this.opponents.setConfig(config);
  }

  tick(step = 1) {
    this.dividers.tick(step);
    this.opponents.tick(step);
    this.mycar.tick(step);
  }

  getState() {
    return {
      mycar: this.mycar.getState(),
      opponents: this.opponents.getState(),
      dividers: this.dividers.getState(),
    };
  }

  moveLeft() {
    this.mycar.moveLeft();
  }
  moveRight() {
    this.mycar.moveRight();
  }
}
