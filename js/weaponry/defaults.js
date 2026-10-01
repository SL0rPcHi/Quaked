window.FPSGame = window.FPSGame || {};

(() => {
  const machinegun = new window.FPSGame.Weapon({
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

  const shotgun = new window.FPSGame.Weapon({
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

  window.FPSGame.machinegun = machinegun;
  window.FPSGame.shotgun = shotgun;
})();
