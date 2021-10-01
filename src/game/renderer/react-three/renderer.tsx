import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { EngineState } from "../..";
import { GameConfig } from "../../../config";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const getLanePosition = (arena: GameConfig["arena"], laneIndex: number) => {
  const laneWidth = arena.width / arena.lanes;
  return Math.round((arena.width / arena.lanes) * laneIndex) + laneWidth / 2;
};

function Box({
  x,
  y,
  z = 0,
  width,
  height,
  depth = 0.1,
  color = "white",
}: {
  x: number;
  y: number;
  z?: number;
  width: number;
  height: number;
  depth?: number;
  color?: string;
}) {
  return (
    <mesh scale={[width, height, depth]} position={[x, y, z]}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const DevTools = () => {
  const three = useThree();

  useEffect(() => {
    // Observe a scene or a renderer
    if (typeof (window as any).__THREE_DEVTOOLS__ !== "undefined") {
      (window as any).__THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("observe", { detail: three.scene })
      );
    }
    three.scene.background = new THREE.Color(0xffffff);
  }, []);

  return null;
};

export const ReactThreeRenderer = ({
  config,
  state,
}: {
  state: EngineState;
  config: GameConfig;
}) => {
  const { arena, car, divider: dividerConfig } = config;

  return (
    <div
      style={{
        backgroundColor: "black",
        width: arena.width,
        height: arena.height,
      }}
    >
      <Canvas
        camera={{ far: 1000, near: 0.1, position: [0, 0, arena.width * 2] }}
      >
        <fog attach="fog" args={["white", 100, 800]} />
        <DevTools />
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[2, 3, 5]} />
        <OrbitControls />
        {/* <group rotation={[Math.PI, -Math.PI, 0]}> */}
        <group position={[-arena.width / 2, -arena.height / 2, 0]}>
          <Box
            width={car.width}
            height={car.height}
            depth={5}
            x={state.mycar.posX}
            y={arena.height - 20}
            z={5 / 2}
          />
          <Box
            width={arena.width}
            height={arena.height}
            depth={0.2}
            x={arena.width / 2}
            y={arena.height / 2}
            z={0.2 / 2}
            color="black"
          />
          {state.dividers.flatMap((divider) => {
            const arr = [];
            for (let i = 0; i < arena.lanes - 1; i++) {
              const posX = Math.round(
                (arena.width / arena.lanes) * (i + 1) - dividerConfig.width / 2
              );
              arr.push(
                <Box
                  key={divider.id + "" + i}
                  x={posX}
                  y={divider.posY}
                  z={0.2}
                  depth={0.2}
                  width={dividerConfig.width}
                  height={dividerConfig.height}
                />
              );
            }
            return arr;
          })}
          {state.opponents.flatMap(({ id, opponents }) => {
            return opponents.map(({ laneIndex, posY }, i) => (
              <Box
                key={id + "" + i}
                x={getLanePosition(arena, laneIndex)}
                y={posY}
                z={5 / 2}
                width={car.width}
                height={car.height}
                depth={5}
              />
            ));
          })}
        </group>
        {/* </group> */}
      </Canvas>
    </div>
  );
};
