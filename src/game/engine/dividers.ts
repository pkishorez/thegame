import { GameConfig } from "../../config";
import { Stream } from "./stream";

export class Dividers {
  stream: Stream;

  constructor(config: GameConfig) {
    this.stream = new Stream({ config: this.transformConfig(config) });
  }

  tick(step = 1) {
    this.stream.tick(step);
  }

  getState() {
    return this.stream.getItems().map(({ pos, ...v }) => ({ ...v, posY: pos }));
  }

  setConfig(config: GameConfig) {
    this.stream.setConfig(this.transformConfig(config));
  }

  private transformConfig(config: GameConfig) {
    const {
      divider: { gap, step },
    } = config;
    return {
      gap,
      length: config.arena.height,
      step,
    };
  }
}
