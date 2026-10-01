window.FPSGame = window.FPSGame || {};

(() => {
  class Weapon {
    constructor({
      name = 'Weapon',
      ammoPool = 200,
      damage = 20,
      fireRate = 0.08,
      spread = 0.02,
      pellets = 1,
      costPerShot = 1,
      minDamage = 12,
      damageFalloff = 0.7
    } = {}) {
      this.name = name;
      this.ammoPool = ammoPool;
      this.damage = damage;
      this.minDamage = minDamage;
      this.damageFalloff = damageFalloff;
      this.fireRate = fireRate;
      this.spread = spread;
      this.pellets = pellets;
      this.costPerShot = costPerShot;
      this.cooldown = 0;
    }

    update(delta) {
      this.cooldown = Math.max(0, this.cooldown - delta);
    }

    getDisplayName() {
      return this.name.toUpperCase();
    }
  }

  const machineGun = new Weapon({
    name: 'Machinegun',
    ammoPool: 200,
    damage: 18,
    fireRate: 0.08,
    spread: 0.025,
    pellets: 1,
    costPerShot: 1,
    minDamage: 10,
    damageFalloff: 0.8
  });

  const shotgun = new Weapon({
    name: 'Shotgun',
    ammoPool: 50,
    damage: 42,
    fireRate: 0.52,
    spread: 0.12,
    pellets: 11,
    costPerShot: 2,
    minDamage: 18,
    damageFalloff: 0.5
  });

  window.FPSGame.Weapon = Weapon;
  window.FPSGame.machineGun = machineGun;
  window.FPSGame.shotgun = shotgun;
})();
