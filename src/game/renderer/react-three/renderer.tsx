import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { EngineState } from "../..";
import { GameConfig } from "../../../config";
import * as THREE from "three";

const getLanePosition = (arena: GameConfig["arena"], laneIndex: number) => {
  const laneWidth = arena.width / arena.lanes;
  return Math.round((arena.width / arena.lanes) * laneIndex) + laneWidth / 2;
};

const transformY = (height: number, y: number) => height - y;

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
  }, []);

  return null;
};

const Child = ({
  config,
  state,
}: {
  state: EngineState;
  config: GameConfig;
}) => {
  useFrame(({ camera }) => {
    camera.position.set(
      state.mycar.posX - config.arena.width / 2,
      -config.arena.height / 2 - config.car.height * 2,
      config.car.height * 3
    );
    camera.lookAt(state.mycar.posX - config.arena.width / 2, 0, 0);
  });

  useThree((three) => {
    three.scene.background = new THREE.Color(background);
  });

  return null;
};

const background = "rgb(240,240,240)";

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
        width: arena.width * 2,
        height: arena.height,
      }}
    >
      <Canvas
        gl={{ antialias: true }}
        camera={{
          far: 30000,
          near: 0.1,
          fov: ((Math.atan(1) * 180) / Math.PI) * 2,
          position: [
            state.mycar.posX,
            -arena.height / 2 - car.height * 2,
            car.height * 3,
          ],
        }}
      >
        <fog attach="fog" args={[background, 100, 1000]} />
        <Child config={config} state={state} />
        <DevTools />
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[2, 3, 5]} />
        {/* <OrbitControls /> */}
        <group position={[-arena.width / 2, -arena.height / 2, 0]}>
          <Box
            width={arena.width}
            height={arena.height * 2}
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
                  y={transformY(arena.height, divider.posY)}
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
                y={transformY(arena.height, posY)}
                z={5 / 2}
                width={car.width}
                height={car.height}
                depth={10}
                color={car.opponent.color}
              />
            ));
          })}
          <Box
            width={car.width}
            height={car.height}
            depth={10}
            x={state.mycar.posX}
            y={transformY(arena.height, arena.height - car.height - 20)}
            z={5 / 2}
            color={car.mycar.color}
          />
        </group>
      </Canvas>
    </div>
  );
};
