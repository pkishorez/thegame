import { IGameConfig } from "./config";
import { Stream } from "./stream";

export class Divider {
  private config: IGameConfig;
  stream: Stream;

  constructor(config: IGameConfig) {
    this.config = config;
    const { divider } = this.config;

    this.stream = new Stream({
      gap: divider.gap,
      step: divider.step,
      height: config.arena.height,
    });
  }

  setConfig(config: IGameConfig) {
    this.config = config;
    const { divider } = this.config;

    this.stream.setConfig({
      gap: divider.gap,
      height: this.config.arena.height,
      step: divider.step,
    });
  }

  tick() {
    this.stream.tick();
  }
  getItems() {
    const { arena, divider } = this.config;

    return this.stream.getItems().flatMap((item) => {
      let arr = [];
      for (let i = 1; i < this.config.arena.lanes; i++) {
        arr.push({
          ...item,
          id: `${item.id}-${i}`,
          x: (arena.width / arena.lanes) * i - divider.width / 2,
        });
      }

      return arr;
    });
  }
}
