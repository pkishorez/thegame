import React from "react";
import { GameConfig } from "../../config";
import "./style.scss";

interface Props {
  config: GameConfig;
}
export const ReactRenderer = ({}: Props) => {
  return <h1>HEllo World!</h1>;
};
