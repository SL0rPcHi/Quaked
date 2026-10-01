window.FPSGame = window.FPSGame || {};

(() => {
  class CameraController {
    constructor(player) {
      this.player = player;
    }

    update(input, delta) {
      const mouse = input.consumeMouseDelta();
      this.player.rotation.yaw -= mouse.x * 0.0022;
      this.player.rotation.pitch -= mouse.y * 0.0018;

      this.player.rotation.pitch = Math.max(-1.4, Math.min(1.4, this.player.rotation.pitch));
    }
  }

  window.FPSGame.CameraController = CameraController;
})();
