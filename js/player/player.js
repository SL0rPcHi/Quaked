window.FPSGame = window.FPSGame || {};

(() => {
  class Player {
    constructor({ x = 0, y = 1.7, z = 0 } = {}) {
      this.position = { x, y, z };
      this.velocity = { x: 0, y: 0, z: 0 };
      this.rotation = { yaw: 0, pitch: 0 };
      this.health = 100;
      this.armor = 0;
      this.speed = 5.5;
      this.jumpForce = 7.5;
      this.onGround = true;
      this.facing = { x: 0, z: 1 };
    }

    update(input, delta) {
      const forward = Number(input.isDown('KeyW')) - Number(input.isDown('KeyS'));
      const strafe = Number(input.isDown('KeyD')) - Number(input.isDown('KeyA'));

      if (forward !== 0 || strafe !== 0) {
        const moveX = Math.sin(this.rotation.yaw) * strafe + Math.cos(this.rotation.yaw) * forward;
        const moveZ = Math.cos(this.rotation.yaw) * strafe - Math.sin(this.rotation.yaw) * forward;

        this.velocity.x = moveX * this.speed;
        this.velocity.z = moveZ * this.speed;
      } else {
        this.velocity.x *= 0.8;
        this.velocity.z *= 0.8;
      }

      if (input.isDown('Space') && this.onGround) {
        this.velocity.y = this.jumpForce;
        this.onGround = false;
      }

      this.position.x += this.velocity.x * delta;
      this.position.z += this.velocity.z * delta;
      this.position.y += this.velocity.y * delta;

      this.velocity.y -= 18 * delta;
      if (this.position.y <= 1.7) {
        this.position.y = 1.7;
        this.velocity.y = 0;
        this.onGround = true;
      }

      this.facing.x = Math.sin(this.rotation.yaw);
      this.facing.z = Math.cos(this.rotation.yaw);
    }
  }

  window.FPSGame.Player = Player;
})();
