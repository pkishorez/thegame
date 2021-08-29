import { GameConfig } from "../../config";
import { EngineState } from "../../engine/engine";
import { ListUI } from "./list-ui";

export class Dividers {
  private config!: GameConfig;
  private ui: ListUI;

  constructor(config: GameConfig) {
    this.setConfig(config);

    this.ui = new ListUI({
      key: "divider",
      wrapperID: "dividers",
      onAdd: (elem) => {
        for (let i = 0; i < this.config.arena.lanes - 1; i++) {
          const d = document.createElement("div");
          d.classList.add("divider");
          elem.append(d);
        }
      },
      onUpdate: (elem, v: EngineState["dividers"][0]) => {
        elem.querySelectorAll("div").forEach((d, i) => {
          d.style.transform = `translateY(${v.posY}px)`;

          const left = Math.round(
            (this.config.arena.width / this.config.arena.lanes) * (i + 1) -
              this.config.divider.width / 2
          );

          if (parseInt(d.style.left, 10) !== left) {
            d.style.left = `${left}px`;
          }

          d.style.opacity = i + 1 >= this.config.arena.lanes ? "0" : "1";
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
      "--divider-width",
      `${this.config.divider.width}px`
    );
    document.documentElement.style.setProperty(
      "--divider-height",
      `${this.config.divider.height}px`
    );
  }

  updateState(state: EngineState) {
    this.ui.update(state.dividers);
  }
}
