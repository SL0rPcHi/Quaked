window.FPSGame = window.FPSGame || {};

(() => {
  class SlideMovementController {
    constructor(player) {
      this.player = player;
      this.slideVelocity = { x: 0, z: 0 };
    }

    update(input, delta) {
      const slideStrength = 0.8;

      this.player.velocity.x *= slideStrength;
      this.player.velocity.z *= slideStrength;

      if (Math.abs(this.player.velocity.x) < 0.05) {
        this.player.velocity.x = 0;
      }
      if (Math.abs(this.player.velocity.z) < 0.05) {
        this.player.velocity.z = 0;
      }

      this.player.position.x += this.player.velocity.x * delta;
      this.player.position.z += this.player.velocity.z * delta;
    }
  }

  window.FPSGame.SlideMovementController = SlideMovementController;
})();
