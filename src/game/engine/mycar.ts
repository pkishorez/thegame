import { GameConfig } from "../../config";

interface MyCarConfig {
  height: number;
  width: number;
  lanes: number;
  step: number;
}

export class MyCar {
  laneIndex = 2;
  x = 0;
  config: MyCarConfig;
  target: number = 0;

  constructor(config: GameConfig) {
    this.config = this.transformConfig(config);
  }

  setConfig(config: GameConfig) {
    this.config = this.transformConfig(config);
  }
  private transformConfig(config: GameConfig): MyCarConfig {
    return {
      height: config.arena.height,
      width: config.arena.width,
      lanes: config.arena.lanes,
      step: config.car.mycar.step,
    };
  }

  tick(step = 1) {
    const target = this.getPosXOfLane(this.laneIndex);
    if (target !== this.x) {
      const prevX = this.x;
      this.x += Math.sign(target - this.x) * this.config.step * step;

      if (Math.sign(target - prevX) !== Math.sign(target - this.x)) {
        this.x = target;
      }
    }
  }

  private getPosXOfLane(laneIndex: number) {
    const laneWidth = this.config.width / this.config.lanes;
    return laneWidth * (laneIndex + 1) - laneWidth / 2;
  }

  moveLeft() {
    this.laneIndex = Math.max(0, this.laneIndex - 1);
  }
  moveRight() {
    this.laneIndex = Math.min(this.config.lanes - 1, this.laneIndex + 1);
  }

  getState() {
    return {
      laneIndex: this.laneIndex,
      posX: this.x,
      targetX: this.getPosXOfLane(this.laneIndex),
    };
  }
}
