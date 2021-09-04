import { config, setupDev } from "./dev";
import { GameEngine, DOMRenderer, CanvasRenderer } from "./game";
import "./style.scss";

function setup() {
  const engine = new GameEngine(config);
  let domRenderer = new DOMRenderer(config);
  let canvasRenderer = new CanvasRenderer(config);

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

  document
    .getElementById("app")
    ?.append(domRenderer.getDOM(), canvasRenderer.getDOM());

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
