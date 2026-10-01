window.FPSGame = window.FPSGame || {};

(() => {
  class PhysicsWorld {
    constructor() {
      this.world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -18, 0)
      });

      this.world.broadphase = new CANNON.SAPBroadphase(this.world);
      this.world.allowSleep = true;

      const groundMaterial = new CANNON.Material();
      const groundBody = new CANNON.Body({
        mass: 0,
        material: groundMaterial
      });

      groundBody.addShape(new CANNON.Plane());
      groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
      this.world.addBody(groundBody);
    }

    step(delta) {
      this.world.step(1 / 60, delta, 3);
    }
  }

  window.FPSGame.PhysicsWorld = PhysicsWorld;
})();
