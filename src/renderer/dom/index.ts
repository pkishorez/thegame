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

  constructor(config: GameConfig) {
    this.uiWrapper = document.createElement("div");
    this.uiWrapper.classList.add("game");

    this.mycar = new MyCar(config);
    this.dividers = new Dividers(config);
    this.opponents = new Opponents(config);

    this.uiWrapper.append(this.mycar.getDOM());
    this.uiWrapper.append(this.dividers.getWrapper());
    this.uiWrapper.append(this.opponents.getWrapper());

    this.setConfig(config);
  }

  getDOM() {
    return this.uiWrapper;
  }

  setConfig(config: GameConfig) {
    this.uiWrapper.style.width = config.arena.width + "px";
    this.uiWrapper.style.height = config.arena.height + "px";

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
