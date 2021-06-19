import { IGameConfig } from "./config";
import { Stream } from "./stream";

interface Opponent {
  position: "left" | "right";
}

export class Opponents {
  opponentMap: {
    [id: number]: Opponent;
  } = {};
  stream: Stream;
  onRemove: any;
  onAdd: any;
  config: IGameConfig;

  constructor(
    config: IGameConfig,
    {
      onAdd,
      onRemove,
    }: {
      onAdd?: Opponents["stream"]["onAdd"];
      onRemove?: Opponents["stream"]["onRemove"];
    }
  ) {
    this.onAdd = onAdd;
    this.onRemove = onRemove;
    this.config = config;
    this.stream = new Stream({
      gap: config.car.gap,
      height: config.arena.height,
      step: config.car.step,
      onAdd: this.add,
      onRemove: this.remove,
    });
  }

  setConfig(config: IGameConfig) {
    this.config = config;
    this.stream.setConfig({
      gap: config.car.gap,
      height: config.arena.height,
      step: config.car.step,
    });
  }

  add = (id: number) => {
    this.opponentMap[id] = {
      position: Math.random() > 0.5 ? "left" : "right",
    };
    this.onAdd(id);
  };
  remove = (id: number) => {
    delete this.opponentMap[id];
    this.onRemove(id);
  };

  getOpponents() {
    const { arena } = this.config;
    return this.stream.getItems().map(({ id, y }) => {
      const { position } = this.opponentMap[id];
      return {
        id,
        y,
        x: position === "left" ? arena.width / 4 : (arena.width * 3) / 4,
      };
    });
  }

  tick() {
    this.stream.tick();
  }
}
