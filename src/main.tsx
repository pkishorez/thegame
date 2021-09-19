import React from "react";
import ReactDOM from "react-dom";
import { config, setupDev } from "./dev";
import { GameEngine, DOMRenderer, CanvasRenderer } from "./game";
import { ReactRenderer } from "./game/renderer/react";
import "./style.scss";
import { useRequestAnimationFrame } from "./utils";

function setup() {
  const engine = new GameEngine(config);
  let domRenderer = new DOMRenderer(config);
  let canvasRenderer = new CanvasRenderer(config);
  const ReactRenderer_ = () => {
    useRequestAnimationFrame();

    return <ReactRenderer config={config} state={engine.getState()} />;
  };
  const reactRendererDOM = document.createElement("div");
  reactRendererDOM.classList.add("react-renderer");

  const { onChange } = setupDev();

  const onConfigChange = () => {
    engine.setConfig(config);

    canvasRenderer.getDOM().style.display = config.renderer.canvas
      ? "block"
      : "none";
    domRenderer.getDOM().style.display = config.renderer.dom ? "block" : "none";

    reactRendererDOM.style.display = config.renderer.react ? "block" : "none";

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

  document
    .getElementById("app")
    ?.append(domRenderer.getDOM(), canvasRenderer.getDOM(), reactRendererDOM);
  ReactDOM.render(<ReactRenderer_ />, reactRendererDOM);

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
