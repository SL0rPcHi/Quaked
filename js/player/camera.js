window.FPSGame = window.FPSGame || {};

(() => {
  class SlideMovementController {
    constructor(player) {
      this.player = player;
    }

    update(input, delta) {
      const friction = 0.82;

      this.player.velocity.x *= friction;
      this.player.velocity.z *= friction;

      if (Math.abs(this.player.velocity.x) < 0.02) this.player.velocity.x = 0;
      if (Math.abs(this.player.velocity.z) < 0.02) this.player.velocity.z = 0;

      this.player.position.x += this.player.velocity.x * delta;
      this.player.position.z += this.player.velocity.z * delta;
    }
  }

  window.FPSGame.SlideMovementController = SlideMovementController;
})();
