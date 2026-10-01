window.FPSGame = window.FPSGame || {};

(() => {
  class GameMap {
    constructor(layout = []) {
      this.layout = layout;
    }

    getCell(x, z) {
      return this.layout[z]?.[x] ?? 0;
    }
  }

  window.FPSGame.GameMap = GameMap;
})();
