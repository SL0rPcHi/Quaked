window.FPSGame = window.FPSGame || {};

(() => {
  class SceneRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
      });

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0b1117);
      this.scene.fog = new THREE.Fog(0x0b1117, 10, 60);

      const hemiLight = new THREE.HemisphereLight(0x8db6d9, 0x111111, 1.1);
      this.scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(5, 8, 3);
      this.scene.add(dirLight);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({
          color: 0x1a1d1f,
          roughness: 0.9,
          metalness: 0.1
        })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0;
      this.scene.add(ground);

      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 1.7, 6);
      this.camera.lookAt(0, 1.7, 0);
    }

    resize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    render() {
      this.renderer.render(this.scene, this.camera);
    }
  }

  window.FPSGame.Renderer = SceneRenderer;
})();
