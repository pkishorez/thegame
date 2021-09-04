import { EngineState } from "../..";
import { GameConfig } from "../../../config";
import { Renderer } from "../type";
import "./style.scss";

export class CanvasRenderer implements Renderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private config!: GameConfig;

  constructor(config: GameConfig) {
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("canvas-renderer");
    const context = this.canvas.getContext("2d");

    if (!context) {
      throw new Error("Error trying to create context.");
    }

    this.context = context;
    this.setConfig(config);
  }

  getDOM() {
    return this.canvas;
  }
  setConfig(config: GameConfig) {
    this.config = config;

    this.canvas.width = config.arena.width;
    this.canvas.height = config.arena.height;
  }

  render(state: EngineState) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render my car
    this.context.fillStyle = "yellow";
    this.context.fillRect(
      state.mycar.posX - this.config.car.width / 2,
      this.canvas.height - this.config.car.height - 30,
      this.config.car.width,
      this.config.car.height
    );

    // Render dividers.

    const laneWidth = this.config.arena.width / this.config.arena.lanes;
    state.dividers.forEach((divider) => {
      for (let i = 0; i < this.config.arena.lanes - 1; i++) {
        this.context.fillStyle = "white";
        this.context.fillRect(
          laneWidth * i + laneWidth - this.config.divider.width / 2,
          divider.posY,
          this.config.divider.width,
          this.config.divider.height
        );
      }
    });

    // Render opponents

    state.opponents.forEach((opponent) => {
      opponent.opponents.forEach((opp) => {
        this.context.fillStyle = "red";
        this.context.fillRect(
          opp.laneIndex * laneWidth + laneWidth / 2 - this.config.car.width / 2,
          opp.posY,
          this.config.car.width,
          this.config.car.height
        );
      });
    });
  }
}
