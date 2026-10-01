window.FPSGame = window.FPSGame || {};

(() => {
  class Player {
    constructor({ x = 0, y = 1.7, z = 0 } = {}) {
      this.position = { x, y, z };
      this.velocity = { x: 0, y: 0, z: 0 };
      this.rotation = { yaw: 0, pitch: 0 };
      this.health = 100;
      this.armor = 0;
      this.speed = 7.5;
      this.jumpForce = 7.5;
      this.onGround = true;
      this.facing = { x: 0, z: 1 };
    }

    updateFacing() {
      this.facing.x = Math.sin(this.rotation.yaw);
      this.facing.z = Math.cos(this.rotation.yaw);
    }
  }

  window.FPSGame.Player = Player;
})();
