window.FPSGame = window.FPSGame || {};

(() => {
  class Enemy extends window.FPSGame.Entity {
    constructor(options = {}) {
      super(options);
      this.type = 'enemy';
      this.speed = options.speed || 1.8;
    }

    update(delta) {
      // placeholder AI logic for chasing or patrolling
    }
  }

  window.FPSGame.Enemy = Enemy;
})();
