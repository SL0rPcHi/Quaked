window.FPSGame = window.FPSGame || {};

(() => {
  const canvas = document.getElementById('gameCanvas');
  const engine = new window.FPSGame.Engine(canvas);
  const input = new window.FPSGame.Input();
  const renderer = new window.FPSGame.Renderer(canvas);
  const physics = new window.FPSGame.PhysicsWorld();

  const player = new window.FPSGame.Player({ x: 0, y: 1.7, z: 7 });
  const movement = new window.FPSGame.MovementController(player);
  const slideMovement = new window.FPSGame.SlideMovementController(player);
  const cameraController = new window.FPSGame.CameraController(player, renderer.camera);

  const weaponSystem = new window.FPSGame.WeaponSystem();
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

  weaponSystem.register(machinegun);
  weaponSystem.register(shotgun);

  const updateWeaponDisplay = () => {
    const weaponEls = [
      document.getElementById('weapon0'),
      document.getElementById('weapon1')
    ];

    weaponEls.forEach((element, index) => {
      if (!element) return;
      const isActive = weaponSystem.currentWeaponIndex === index;
      element.classList.toggle('active', isActive);
      if (isActive) {
        element.textContent = `[ ${weaponSystem.currentWeapon().name.toUpperCase()} ]`;
      } else {
        element.textContent = weaponSystem.weapons[index].name.toUpperCase();
      }
    });
  };

  weaponSystem.onWeaponSwitch(updateWeaponDisplay);
  updateWeaponDisplay();

  const onWeaponSwitch = (event) => {
    const index = event.detail.index;
    weaponSystem.setWeapon(index);
    updateWeaponDisplay();
  };

  window.addEventListener('weapon-switch', onWeaponSwitch);

  const hud = {
    ammo: document.getElementById('ammoValue'),
    health: document.getElementById('healthValue'),
    armor: document.getElementById('armorValue')
  };

  engine.on('update', ({ delta }) => {
    weaponSystem.update(delta);

    const mouseDelta = input.consumeMouseDelta();
    if (mouseDelta.x || mouseDelta.y) {
      player.rotation.yaw -= mouseDelta.x * 0.0022;
      player.rotation.pitch -= mouseDelta.y * 0.0018;
      player.rotation.pitch = Math.max(-1.4, Math.min(1.4, player.rotation.pitch));
    }

    const isMoving = input.isDown('KeyW') || input.isDown('KeyA') || input.isDown('KeyS') || input.isDown('KeyD');

    if (isMoving) {
      movement.update(input, delta);
    } else {
      slideMovement.update(input, delta);
    }

    if (input.isDown('Space') && player.onGround) {
      player.velocity.y = player.jumpForce;
      player.onGround = false;
    }

    player.position.y += player.velocity.y * delta;
    player.velocity.y -= 18 * delta;

    if (player.position.y <= 1.7) {
      player.position.y = 1.7;
      player.velocity.y = 0;
      player.onGround = true;
    }

    if (input.mouse.down) {
      const firedWeapon = weaponSystem.fire();
      if (firedWeapon) {
        const shots = [];
        const pelletCount = firedWeapon.pellets;
        for (let i = 0; i < pelletCount; i += 1) {
          const spreadAmount = firedWeapon.spread * (Math.random() - 0.5);
          shots.push({
            damage: firedWeapon.damage,
            spread: spreadAmount
          });
        }
      }
    }

    cameraController.update(input);
    physics.step(delta);

    hud.ammo.textContent = String(weaponSystem.currentWeapon().ammoPool);
    hud.health.textContent = String(Math.max(0, Math.round(player.health)));
    hud.armor.textContent = String(Math.max(0, Math.round(player.armor)));
  });

  engine.on('render', () => {
    renderer.render();
  });

  engine.on('resize', () => {
    renderer.resize();
  });

  canvas.addEventListener('click', () => {
    if (document.pointerLockElement !== canvas) {
      canvas.requestPointerLock();
    }
  });

  engine.start();
})();
