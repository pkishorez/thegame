import { GameConfig } from "../../config";
import { EngineState } from "../engine/index";

export interface Renderer {
  getDOM: () => HTMLElement;
  setConfig: (config: GameConfig) => void;
  render: (state: EngineState) => void;
}
