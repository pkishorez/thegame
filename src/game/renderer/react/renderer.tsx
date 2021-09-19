import React from "react";
import { EngineState } from "../..";
import { GameConfig } from "../../../config";
import "../dom/style.scss";

const getLanePosition = (arena: GameConfig["arena"], laneIndex: number) => {
  const laneWidth = arena.width / arena.lanes;
  return Math.round((arena.width / arena.lanes) * laneIndex) + laneWidth / 2;
};
export const ReactRenderer = ({
  state,
  config,
}: {
  state: EngineState;
  config: GameConfig;
}) => {
  const { arena, car, divider: dividerConfig } = config;

  return (
    <div className="dom-renderer">
      <div
        className="arena"
        style={{
          width: arena.width,
          height: arena.height,
        }}
      >
        <div
          className="mycar"
          style={{
            bottom: 20,
            top: "auto",
            width: car.width,
            height: car.height,
            transform: `translateX(${state.mycar.posX - car.width / 2}px)`,
          }}
        />
        <div className="dividers">
          {state.dividers.map((divider) => {
            const arr = [];
            for (let i = 0; i < arena.lanes - 1; i++) {
              const posX = Math.round(
                (arena.width / arena.lanes) * (i + 1) - dividerConfig.width / 2
              );
              arr.push(
                <div
                  className="divider"
                  key={divider.id + "" + i}
                  style={{
                    left: posX,
                    width: dividerConfig.width,
                    height: dividerConfig.height,
                    transform: `translateY(${divider.posY}px)`,
                  }}
                />
              );
            }
            return arr;
          })}
        </div>
        <div className="opponents">
          {state.opponents.map(({ id, opponents }) => {
            return opponents.map(({ laneIndex, posY }, i) => (
              <div
                className="opponent"
                key={id + "" + i}
                style={{
                  left: getLanePosition(arena, laneIndex) - car.width / 2,
                  width: car.width,
                  height: car.height,
                  transform: `translateY(${posY}px)`,
                }}
              />
            ));
          })}
        </div>
      </div>
    </div>
  );
};
