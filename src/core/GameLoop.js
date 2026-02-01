export function startGameLoop(update, render, renderer) {
  function loop(time) {
    update(time);
    render();
  }

  renderer.setAnimationLoop(loop);
}
