window.FPSGame = window.FPSGame || {};

(() => {
  class Weapon {
    constructor({
      name = 'weapon',
      damage = 25,
      fireRate = 0.12,
      ammoPerClip = 30,
      reserveAmmo = 90,
      spread = 0.02
    } = {}) {
      this.name = name;
      this.damage = damage;
      this.fireRate = fireRate;
      this.ammoPerClip = ammoPerClip;
      this.reserveAmmo = reserveAmmo;
      this.ammoInClip = ammoPerClip;
      this.spread = spread;
      this.cooldown = 0;
    }

    update(delta) {
      this.cooldown = Math.max(0, this.cooldown - delta);
    }

    fire() {
      if (this.cooldown > 0 || this.ammoInClip <= 0) return false;
      this.cooldown = this.fireRate;
      this.ammoInClip -= 1;
      return true;
    }
  }

  window.FPSGame.Weapon = Weapon;
})();
