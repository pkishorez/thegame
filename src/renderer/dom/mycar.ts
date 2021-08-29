import { GameConfig } from "../../config";
import { EngineState } from "../../engine/engine";
import "./style.scss";

export class MyCar {
  private ui: HTMLDivElement;
  config!: GameConfig;

  constructor(config: GameConfig) {
    this.ui = document.createElement("div");
    this.ui.classList.add("mycar");
    this.setConfig(config);
    this.ui.style.bottom = "20px";
    this.ui.style.top = "auto";
  }

  getDOM() {
    return this.ui;
  }

  setConfig(config: GameConfig) {
    this.config = config;
    this.ui.style.width = config.car.width + "px";
    this.ui.style.height = config.car.height + "px";
  }

  render(engineState: EngineState) {
    this.ui.style.left =
      engineState.mycar.posX - this.config.car.width / 2 + "px";
  }
}
