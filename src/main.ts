import { config, onChange } from "./dev";
import { GameEngine } from "./engine/engine";
import { DOMRenderer } from "./renderer/dom";

function setup() {
  const engine = new GameEngine(config);
  const renderer = new DOMRenderer(config);

  onChange(() => {
    engine.setConfig(config);
    renderer.setConfig(config);
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

  document.body.append(renderer.getDOM());

  function tick() {
    engine.tick();
    renderer.render(engine.getState());

    requestAnimationFrame(tick);
  }

  tick();
}

setup();
