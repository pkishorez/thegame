import { GameConfig } from "../../config";
import { Stream, StreamConfig } from "./stream";

interface Opponent {
  laneIndex: number;
  dY: number;
}

interface OpponentConfig extends StreamConfig {
  lanes: number;
}

export class Opponents {
  opponentMap: {
    [id: number]: Opponent[];
  } = {};
  stream: Stream;
  config: OpponentConfig;

  constructor(config: GameConfig) {
    this.config = this.transformConfig(config);

    this.stream = new Stream({
      config: this.config,
      onAdd: this.onAdd,
      onRemove: this.onRemove,
    });
  }

  setConfig(config: GameConfig) {
    this.config = this.transformConfig(config);
    this.stream.setConfig(this.config);
  }

  private transformConfig(config: GameConfig): OpponentConfig {
    const {
      car: {
        opponent: { gap, step },
      },
      arena: { height: length, lanes },
    } = config;

    return {
      gap,
      lanes,
      length,
      step,
    };
  }

  onAdd = (id: number) => {
    const position = Math.round(Math.random() * (this.config.lanes - 1));
    let opponents: Opponent[] = [];

    for (let i = 0; i < this.config.lanes; i++) {
      if (i !== position) {
        opponents.push({ laneIndex: i, dY: 0 });
      }
    }

    this.opponentMap[id] = opponents;
  };
  onRemove = (id: number) => {
    delete this.opponentMap[id];
  };

  getState() {
    return this.stream.getItems().map(({ id, pos: posY }) => {
      const opponents = this.opponentMap[id];

      return {
        id,
        opponents: opponents.map(({ dY, ...v }) => ({
          ...v,
          posY: posY + dY,
        })),
      };
    });
  }

  tick(step = 1) {
    this.stream.tick(step);
  }
}
