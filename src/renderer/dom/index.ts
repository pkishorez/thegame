import { GameConfig } from "../../config";
import { EngineState } from "../../engine/engine";
import { Dividers } from "./dividers";
import { MyCar } from "./mycar";
import { Opponents } from "./opponents";
import "./style.scss";

export class DOMRenderer {
  private uiWrapper: HTMLDivElement;
  private dividers: Dividers;
  private opponents: Opponents;
  mycar: MyCar;
  arena: HTMLDivElement;

  constructor(config: GameConfig) {
    this.uiWrapper = document.createElement("div");
    this.uiWrapper.classList.add("game");

    const left = document.createElement("div");
    left.classList.add("left-footpath");
    const right = document.createElement("div");
    right.classList.add("right-footpath");

    this.mycar = new MyCar(config);
    this.dividers = new Dividers(config);
    this.opponents = new Opponents(config);

    this.arena = document.createElement("div");
    this.arena.classList.add("arena");
    this.arena.append(this.mycar.getDOM());
    this.arena.append(this.dividers.getWrapper());
    this.arena.append(this.opponents.getWrapper());

    this.uiWrapper.append(left, this.arena, right);

    this.setConfig(config);
  }

  getDOM() {
    return this.uiWrapper;
  }

  setConfig(config: GameConfig) {
    this.arena.style.width = config.arena.width + "px";
    this.arena.style.height = config.arena.height + "px";

    this.mycar.setConfig(config);
    this.dividers.setConfig(config);
    this.opponents.setConfig(config);
  }

  render(engineState: EngineState) {
    this.mycar.render(engineState);
    this.dividers.updateState(engineState);
    this.opponents.updateState(engineState);
  }
}
