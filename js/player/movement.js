window.FPSGame = window.FPSGame || {};

(() => {
  class MovementController {
    constructor(player) {
      this.player = player;
    }

    update(input, delta) {
      const forward = Number(input.isDown('KeyW')) - Number(input.isDown('KeyS'));
      const strafe = Number(input.isDown('KeyD')) - Number(input.isDown('KeyA'));
      const speedMultiplier = input.isDown('ShiftLeft') ? 1.5 : 1;

      const yaw = this.player.rotation.yaw;
      const moveX = Math.sin(yaw) * strafe + Math.cos(yaw) * forward;
      const moveZ = Math.cos(yaw) * strafe - Math.sin(yaw) * forward;

      this.player.velocity.x = moveX * this.player.speed * speedMultiplier;
      this.player.velocity.z = moveZ * this.player.speed * speedMultiplier;

      if (forward === 0 && strafe === 0) {
        this.player.velocity.x *= 0.7;
        this.player.velocity.z *= 0.7;
      }

      this.player.position.x += this.player.velocity.x * delta;
      this.player.position.z += this.player.velocity.z * delta;
    }
  }

  window.FPSGame.MovementController = MovementController;
})();
