window.FPSGame = window.FPSGame || {};

(() => {
  class WeaponSystem {
    constructor() {
      this.weapons = [];
      this.currentWeaponIndex = 0;
      this.ammo = {
        pistol: 60,
        rifle: 90,
        shotgun: 20
      };
    }

    register(weapon) {
      this.weapons.push(weapon);
    }

    setWeapon(index) {
      if (index < 0 || index >= this.weapons.length) return;
      this.currentWeaponIndex = index;
    }

    currentWeapon() {
      return this.weapons[this.currentWeaponIndex] || null;
    }

    fire() {
      const weapon = this.currentWeapon();
      if (!weapon) return false;
      if (weapon.ammoInClip <= 0) return false;

      weapon.ammoInClip -= 1;
      return true;
    }

    switchNext() {
      this.setWeapon((this.currentWeaponIndex + 1) % this.weapons.length);
    }
  }

  window.FPSGame.WeaponSystem = WeaponSystem;
})();
