window.FPSGame = window.FPSGame || {};

(() => {
  class InputHandler {
    constructor() {
      this.keys = new Set();
      this.mouse = {
        x: 0,
        y: 0,
        down: false,
        deltaX: 0,
        deltaY: 0,
        button: null
      };

      this.bindEvents();
    }

    bindEvents() {
      window.addEventListener('keydown', (event) => {
        this.keys.add(event.code);
      });

      window.addEventListener('keyup', (event) => {
        this.keys.delete(event.code);
      });

      window.addEventListener('mousemove', (event) => {
        this.mouse.deltaX = event.movementX || 0;
        this.mouse.deltaY = event.movementY || 0;
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
      });

      window.addEventListener('mousedown', (event) => {
        this.mouse.down = true;
        this.mouse.button = event.button;
      });

      window.addEventListener('mouseup', (event) => {
        this.mouse.down = false;
        this.mouse.button = null;
      });

      window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
      });
    }

    isDown(code) {
      return this.keys.has(code);
    }

    consumeMouseDelta() {
      const delta = {
        x: this.mouse.deltaX,
        y: this.mouse.deltaY
      };
      this.mouse.deltaX = 0;
      this.mouse.deltaY = 0;
      return delta;
    }

    reset() {
      this.keys.clear();
      this.mouse.down = false;
      this.mouse.button = null;
      this.mouse.deltaX = 0;
      this.mouse.deltaY = 0;
    }
  }

  window.FPSGame.Input = InputHandler;
})();
