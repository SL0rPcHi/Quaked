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
        button: null,
        locked: false
      };

      this.bindEvents();
    }

    bindEvents() {
      window.addEventListener('keydown', (event) => {
        this.keys.add(event.code);

        if (event.code === 'Digit1') {
          this.emitWeaponSwitch(0);
        }

        if (event.code === 'Digit2') {
          this.emitWeaponSwitch(1);
        }
      });

      window.addEventListener('keyup', (event) => {
        this.keys.delete(event.code);
      });

      window.addEventListener('mousemove', (event) => {
        if (!this.mouse.locked) return;
        this.mouse.deltaX += event.movementX || 0;
        this.mouse.deltaY += event.movementY || 0;
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

      document.addEventListener('pointerlockchange', () => {
        this.mouse.locked = document.pointerLockElement !== null;
      });

      window.addEventListener('click', () => {
        const canvas = document.getElementById('gameCanvas');
        if (canvas && document.pointerLockElement !== canvas) {
          canvas.requestPointerLock();
        }
      });
    }

    emitWeaponSwitch(index) {
      const event = new CustomEvent('weapon-switch', { detail: { index } });
      window.dispatchEvent(event);
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
