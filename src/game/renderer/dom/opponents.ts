import { GameConfig } from "../../../config";
import { EngineState } from "../../engine/engine";
import { ListUI } from "./list-ui";

export class Opponents {
  private config!: GameConfig;
  private ui: ListUI;

  constructor(config: GameConfig) {
    this.setConfig(config);

    this.ui = new ListUI({
      key: "opponent",
      wrapperID: "opponents",
      onAdd: (elem) => {
        for (let i = 0; i < this.config.arena.lanes - 1; i++) {
          const d = document.createElement("div");
          d.classList.add("opponent");
          elem.append(d);
        }
      },
      onUpdate: (elem, v: EngineState["opponents"][0]) => {
        elem.querySelectorAll("div").forEach((d, i) => {
          const laneWidth = this.config.arena.width / this.config.arena.lanes;
          const opponent = v.opponents[i];

          if (!opponent) {
            return;
          }

          d.style.transform = `translate(${
            laneWidth * opponent.laneIndex -
            this.config.car.width / 2 +
            laneWidth / 2
          }px, ${opponent.posY}px)`;
        });
      },
    });
  }

  getWrapper() {
    return this.ui.getWrapper();
  }

  setConfig(config: GameConfig) {
    this.config = config;

    document.documentElement.style.setProperty(
      "--opponent-color",
      this.config.car.opponent.color
    );
    document.documentElement.style.setProperty(
      "--opponent-width",
      `${this.config.car.width}px`
    );
    document.documentElement.style.setProperty(
      "--opponent-height",
      `${this.config.car.height}px`
    );
  }

  updateState(state: EngineState) {
    this.ui.update(state.opponents);
  }
}
