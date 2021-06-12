import { Stream } from "./stream";

interface Opponent {
  x: number;
}

export class Opponents {
  opponentMap: {
    [id: number]: Opponent;
  } = {};
  width: number;
  stream: Stream;
  onRemove: any;
  onAdd: any;

  constructor({
    width,
    height,
    gap = 50,
    step = 4,
    onAdd,
    onRemove,
  }: {
    gap?: number;
    step?: number;
    width: number;
    height: number;
    onAdd?: Opponents["stream"]["onAdd"];
    onRemove?: Opponents["stream"]["onRemove"];
  }) {
    this.onAdd = onAdd;
    this.onRemove = onRemove;
    this.width = width;
    this.stream = new Stream({
      gap,
      height,
      step,
      onAdd: this.add,
      onRemove: this.remove,
    });
  }

  add = (id: number) => {
    this.opponentMap[id] = {
      x: Math.random() > 0.5 ? this.width / 4 : (this.width * 3) / 4,
    };
    this.onAdd(id);
  };
  remove = (id: number) => {
    delete this.opponentMap[id];
    this.onRemove(id);
  };

  getOpponents() {
    return this.stream.getItems().map(({ id, y }) => ({
      id,
      y,
      x: this.opponentMap[id].x,
    }));
  }

  tick() {
    this.stream.tick();
  }
}
