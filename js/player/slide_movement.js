window.FPSGame = window.FPSGame || {};

(() => {
  class MovementController {
    constructor(player) {
      this.player = player;
    }

    update(input, delta) {
      const forward = Number(input.isDown('KeyW')) - Number(input.isDown('KeyS'));
      const strafe = Number(input.isDown('KeyD')) - Number(input.isDown('KeyA'));
      const sprint = input.isDown('ShiftLeft') ? 1.35 : 1;

      const moveX = Math.sin(this.player.rotation.yaw) * strafe + Math.cos(this.player.rotation.yaw) * forward;
      const moveZ = Math.cos(this.player.rotation.yaw) * strafe - Math.sin(this.player.rotation.yaw) * forward;

      const currentSpeed = this.player.speed * sprint;

      this.player.velocity.x = moveX * currentSpeed;
      this.player.velocity.z = moveZ * currentSpeed;

      if (forward === 0 && strafe === 0) {
        this.player.velocity.x *= 0.75;
        this.player.velocity.z *= 0.75;
      }

      this.player.position.x += this.player.velocity.x * delta;
      this.player.position.z += this.player.velocity.z * delta;
      this.player.updateFacing();
    }
  }

  window.FPSGame.MovementController = MovementController;
})();
