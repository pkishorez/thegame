import { EngineState } from "../..";
import { GameConfig } from "../../../config";
import { Renderer } from "../type";
import "./style.scss";

export class CanvasRenderer implements Renderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

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
    this.canvas.width = config.arena.width;
    this.canvas.height = config.arena.height;
  }

  render(state: EngineState) {
    console.log("STATE: ", state);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
