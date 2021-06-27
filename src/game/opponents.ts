import { IGameConfig } from "./config";
import { Stream } from "./stream";

interface Opponent {
  position: number;
}

export class Opponents {
  opponentMap: {
    [id: number]: Opponent;
  } = {};
  stream: Stream;
  config: IGameConfig;

  constructor(config: IGameConfig) {
    this.config = config;
    this.stream = new Stream({
      gap: config.opponent.gap,
      height: config.arena.height,
      step: config.opponent.step,
      onAdd: this.onAdd,
      onReuse: this.onAdd,
      onRemove: this.remove,
    });
  }

  setConfig(config: IGameConfig) {
    this.config = config;
    this.stream.setConfig({
      gap: config.opponent.gap,
      height: config.arena.height,
      step: config.opponent.step,
    });
  }

  onAdd = (id: number) => {
    const position = Math.round(Math.random() * (this.config.arena.lanes - 1));

    this.opponentMap[id] = {
      position: position,
    };
  };
  remove = (id: number) => {
    delete this.opponentMap[id];
  };

  getOpponents() {
    const { arena } = this.config;
    return this.stream.getItems().map(({ id, y }) => {
      const { position } = this.opponentMap[id];

      return {
        id,
        y,
        x: (position * 2 + 1) * (arena.width / (arena.lanes * 2)),
      };
    });
  }

  tick() {
    this.stream.tick();
  }
}
