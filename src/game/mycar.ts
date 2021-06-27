import { IGameConfig } from "./config";

export class MyCar {
  private x: number;
  private y: number;

  positionIndex = 0;
  config: IGameConfig;

  constructor(config: IGameConfig) {
    this.config = config;
    this.x = 0;
    this.y = config.arena.height - config.car.height - 20;
  }

  setConfig(config: IGameConfig) {
    this.config = config;
    this.y = config.arena.height - config.car.height - 20;
  }

  moveLeft() {
    this.positionIndex = Math.max(0, this.positionIndex - 1);
  }
  moveRight() {
    this.positionIndex = Math.min(
      this.config.arena.lanes - 1,
      this.positionIndex + 1
    );
  }

  getDimensions() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  tick() {
    const targetPosition =
      (this.config.arena.width * (this.positionIndex * 2 + 1)) /
      (this.config.arena.lanes * 2);

    const d = targetPosition - this.x;
    const diff = d !== 0 ? (d / Math.abs(d)) * this.config.mycar.step : 0;

    this.x += Math.abs(diff) > Math.abs(d) ? d : diff;
  }
}
