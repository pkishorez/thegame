import { IGameConfig } from "./config";
import { Stream } from "./stream";

export class Divider {
  private config: IGameConfig;
  stream: Stream;
  constructor(
    config: IGameConfig,
    {
      onAdd,
      onRemove,
    }: { onAdd: Stream["onAdd"]; onRemove: Stream["onRemove"] }
  ) {
    this.config = config;
    const { divider } = this.config;
    this.stream = new Stream({
      gap: divider.gap,
      height: this.config.arena.height,
      step: divider.step,
      onRemove,
      onAdd,
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
    return this.stream.getItems();
  }
}
