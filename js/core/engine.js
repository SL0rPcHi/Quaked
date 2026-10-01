window.FPSGame = window.FPSGame || {};

(() => {
  class Engine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.running = false;
      this.lastTimestamp = performance.now();
      this.deltaTime = 0;
      this.elapsed = 0;
      this.fps = 0;
      this.fpsAccumulator = 0;
      this.fpsFrames = 0;
      this.listeners = {};

      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      const ratio = window.devicePixelRatio || 1;
      this.canvas.width = Math.floor(window.innerWidth * ratio);
      this.canvas.height = Math.floor(window.innerHeight * ratio);
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.style.height = window.innerHeight + 'px';
      this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      this.emit('resize', {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: ratio
      });
    }

    start() {
      if (this.running) return;
      this.running = true;
      this.lastTimestamp = performance.now();
      this.loop(this.lastTimestamp);
    }

    stop() {
      this.running = false;
    }

    loop(timestamp) {
      if (!this.running) return;

      const delta = Math.min((timestamp - this.lastTimestamp) / 1000, 0.033);
      this.lastTimestamp = timestamp;
      this.deltaTime = delta;
      this.elapsed += delta;

      this.fpsAccumulator += delta;
      this.fpsFrames += 1;
      if (this.fpsAccumulator >= 0.5) {
        this.fps = this.fpsFrames / this.fpsAccumulator;
        this.fpsFrames = 0;
        this.fpsAccumulator = 0;
      }

      this.update(delta);
      this.render();
      requestAnimationFrame((nextTimestamp) => this.loop(nextTimestamp));
    }

    update(delta) {
      this.emit('update', {
        delta,
        elapsed: this.elapsed,
        fps: this.fps
      });
    }

    render() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.ctx.clearRect(0, 0, width, height);
      this.ctx.fillStyle = '#04070a';
      this.ctx.fillRect(0, 0, width, height);

      this.emit('render', {
        ctx: this.ctx,
        width,
        height,
        elapsed: this.elapsed
      });
    }

    on(eventName, callback) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(callback);
    }

    emit(eventName, payload) {
      const listeners = this.listeners[eventName] || [];
      for (const callback of listeners) {
        callback(payload);
      }
    }
  }

  window.FPSGame.Engine = Engine;
})();
