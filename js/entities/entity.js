window.FPSGame = window.FPSGame || {};

(() => {
  class Entity {
    constructor({ x = 0, y = 0, z = 0, health = 100 } = {}) {
      this.position = { x, y, z };
      this.health = health;
      this.active = true;
    }

    update(delta) {
      // placeholder for entity-specific movement or AI
    }

    render(ctx) {
      // placeholder for custom draw logic
    }
  }

  window.FPSGame.Entity = Entity;
})();
