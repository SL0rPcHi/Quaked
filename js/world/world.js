window.FPSGame = window.FPSGame || {};

(() => {
  class World {
    constructor() {
      this.entities = [];
      this.map = [];
    }

    addEntity(entity) {
      this.entities.push(entity);
    }

    update(delta) {
      for (const entity of this.entities) {
        if (entity.update) entity.update(delta);
      }
    }

    render(ctx) {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  window.FPSGame.World = World;
})();
