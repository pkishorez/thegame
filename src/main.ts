import { config, setupDev } from "./dev";
import { GameEngine, DOMRenderer, CanvasRenderer } from "./game";
import "./style.scss";

function setup() {
  const engine = new GameEngine(config);
  const domRenderer = new DOMRenderer(config);
  const canvasRenderer = new CanvasRenderer(config);

  const { onChange } = setupDev();
  onChange(() => {
    engine.setConfig(config);
    domRenderer.setConfig(config);
    canvasRenderer.setConfig(config);
  });

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
    ?.append(domRenderer.getDOM(), canvasRenderer.getDOM());

  function tick() {
    engine.tick();
    const state = engine.getState();
    domRenderer.render(state);
    canvasRenderer.render(state);

    requestAnimationFrame(tick);
  }

  tick();
}

setup();
