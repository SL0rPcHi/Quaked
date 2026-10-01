window.FPSGame = window.FPSGame || {};

(() => {
  const canvas = document.getElementById('gameCanvas');
  const engine = new window.FPSGame.Engine(canvas);
  const input = new window.FPSGame.Input();
  const player = new window.FPSGame.Player({ x: 0, y: 1.7, z: 0 });
  const movement = new window.FPSGame.MovementController(player);
  const cameraController = new window.FPSGame.CameraController(player);
  const world = new window.FPSGame.World();
  const weaponSystem = new window.FPSGame.WeaponSystem();

  const rifle = new window.FPSGame.Weapon({
    name: 'Rifle',
    damage: 35,
    fireRate: 0.1,
    ammoPerClip: 30,
    reserveAmmo: 90,
    spread: 0.03
  });

  weaponSystem.register(rifle);

  engine.on('update', ({ delta, elapsed, fps }) => {
    const mouseDelta = input.consumeMouseDelta();
    if (mouseDelta.x || mouseDelta.y) {
      player.rotation.yaw -= mouseDelta.x * 0.0022;
      player.rotation.pitch -= mouseDelta.y * 0.0018;
    }

    if (input.isDown('KeyW') || input.isDown('KeyA') || input.isDown('KeyS') || input.isDown('KeyD')) {
      movement.update(input, delta);
    } else {
      player.velocity.x *= 0.8;
      player.velocity.z *= 0.8;
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
      weaponSystem.fire();
    }

    rifle.update(delta);

    const ammoValue = document.getElementById('ammoValue');
    const healthValue = document.getElementById('healthValue');
    const armorValue = document.getElementById('armorValue');

    if (ammoValue) ammoValue.textContent = String(rifle.ammoInClip);
    if (healthValue) healthValue.textContent = String(Math.max(0, Math.round(player.health)));
    if (armorValue) armorValue.textContent = String(Math.max(0, Math.round(player.armor)));
  });

  engine.on('render', ({ ctx, width, height }) => {
    ctx.fillStyle = '#0a0d10';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#1c1d1f';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height * 0.2);
  });

  engine.start();
})();
