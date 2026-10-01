window.FPSGame = window.FPSGame || {};

(() => {
  class CameraController {
    constructor(player, camera) {
      this.player = player;
      this.camera = camera;
    }

    update(input) {
      const mouse = input.consumeMouseDelta();
      this.player.rotation.yaw -= mouse.x * 0.0022;
      this.player.rotation.pitch -= mouse.y * 0.0018;
      this.player.rotation.pitch = Math.max(-1.4, Math.min(1.4, this.player.rotation.pitch));

      this.camera.rotation.order = 'YXZ';
      this.camera.rotation.y = this.player.rotation.yaw;
      this.camera.rotation.x = this.player.rotation.pitch;
      this.camera.position.set(
        this.player.position.x,
        this.player.position.y,
        this.player.position.z
      );
    }
  }

  window.FPSGame.CameraController = CameraController;
})();
