import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { config, setupDev } from "./dev";
import { GameEngine, Renderer } from "./game";
import "./style.scss";
import { useRequestAnimationFrame } from "./utils";

function setup() {
  const engine = new GameEngine(config);
  let domRenderer = new Renderer.DOMRenderer(config);
  let canvasRenderer = new Renderer.CanvasRenderer(config);
  const ReactRenderer_ = () => {
    useRequestAnimationFrame();
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      divRef.current?.append(domRenderer.getDOM(), canvasRenderer.getDOM());
    }, []);

    const state = engine.getState();

    return (
      <div ref={divRef} className="renderer-container">
        {config.renderer.react && (
          <Renderer.ReactRenderer config={config} state={state} />
        )}
        {config.renderer.three && (
          <Renderer.ReactThreeRenderer config={config} state={state} />
        )}
      </div>
    );
  };

  const { onChange } = setupDev();

  const onConfigChange = () => {
    engine.setConfig(config);

    canvasRenderer.getDOM().style.display = config.renderer.canvas
      ? "block"
      : "none";
    domRenderer.getDOM().style.display = config.renderer.dom ? "block" : "none";

    domRenderer.setConfig(config);
    canvasRenderer.setConfig(config);
  };
  onChange(onConfigChange);

  onConfigChange();

  window.addEventListener("keydown", (ev) => {
    switch (ev.key) {
      case "ArrowLeft": {
        engine.moveLeft();
        break;
      }
      case "ArrowRight": {
        engine.moveRight();
        break;
      }
    }
  });
  window.addEventListener("click", (ev) => {
    if (ev.pageX > window.innerWidth / 2) {
      engine.moveRight();
    } else {
      engine.moveLeft();
    }
  });

  ReactDOM.render(<ReactRenderer_ />, document.getElementById("app"));

  function tick() {
    engine.tick();
    const state = engine.getState();

    if (config.renderer.dom) {
      domRenderer.render(state);
    }
    if (config.renderer.canvas) {
      canvasRenderer.render(state);
    }

    requestAnimationFrame(tick);
  }

  tick();
}

setup();
