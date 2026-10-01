window.FPSGame = window.FPSGame || {};

(() => {
  class WeaponSystem {
    constructor() {
      this.weapons = [];
      this.currentWeaponIndex = 0;
      this.fireCooldown = 0;
      this.weaponSwitchListeners = [];
    }

    register(weapon) {
      this.weapons.push(weapon);
    }

    setWeapon(index) {
      if (index < 0 || index >= this.weapons.length) return false;
      this.currentWeaponIndex = index;
      this.fireCooldown = 0;
      this.notifyWeaponSwitch();
      return true;
    }

    currentWeapon() {
      return this.weapons[this.currentWeaponIndex] || null;
    }

    notifyWeaponSwitch() {
      const weapon = this.currentWeapon();
      for (const cb of this.weaponSwitchListeners) {
        cb(weapon);
      }
    }

    onWeaponSwitch(cb) {
      this.weaponSwitchListeners.push(cb);
    }

    update(delta) {
      this.fireCooldown = Math.max(0, this.fireCooldown - delta);
    }

    hasAmmo(weapon, cost = 1) {
      return weapon.ammoPool >= cost;
    }

    fire() {
      const weapon = this.currentWeapon();
      if (!weapon) return null;
      if (this.fireCooldown > 0) return null;
      if (!this.hasAmmo(weapon, weapon.costPerShot)) return null;

      weapon.ammoPool -= weapon.costPerShot;
      this.fireCooldown = weapon.fireRate;
      return weapon;
    }
  }

  window.FPSGame.WeaponSystem = WeaponSystem;
})();
