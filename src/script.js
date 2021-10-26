import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
gui.hide();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axis helper
const axisHelper = new THREE.AxisHelper();
// scene.add(axisHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/6.png");

/**
 * Fonts
 */

const params = {
  size: 0.5,
  height: 0.2,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 5,
};

const fontLoader = new THREE.FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  params.font = font;
  const nameGeometry = new THREE.TextGeometry("Hazim Arafa", params);
  nameGeometry.center();
  const titleGeometry = new THREE.TextGeometry("Creative Developer", params);
  titleGeometry.center();
  titleGeometry.translate(0, -0.75, 0);
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const name = new THREE.Mesh(nameGeometry, material);
  const title = new THREE.Mesh(titleGeometry, material);
  scene.add(name, title);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

  for (let i = 0; i < 50; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    const cube = new THREE.Mesh(cubeGeometry, material);

    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    cube.position.z = Math.random() * 10 - 5;
    cube.rotation.x = Math.random() * Math.PI * 2;
    cube.rotation.y = Math.random() * Math.PI * 2;

    donut.position.x = Math.random() * 10 - 5;
    donut.position.y = Math.random() * 10 - 5;
    donut.position.z = Math.random() * 10 - 5;
    donut.rotation.x = Math.random() * Math.PI * 2;
    donut.rotation.y = Math.random() * Math.PI * 2;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
    cube.scale.set(scale, scale, scale);

    const spin = () => {
      const elapsedTime = clock.getElapsedTime();

      donut.position.x += Math.cos(elapsedTime) * 0.005;
      donut.position.y += Math.sin(elapsedTime) * 0.005;
      // donut.position.z += Math.sin(elapsedTime) * 0.005;
      cube.position.x += Math.cos(elapsedTime) * 0.005;
      cube.position.y += Math.sin(elapsedTime) * 0.005;
      // cube.position.z += Math.sin(elapsedTime) * 0.00;
      donut.rotation.x += 0.01;
      donut.rotation.y += 0.01;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      window.requestAnimationFrame(spin);
    };
    // window.requestAnimationFrame(() => {
    //   donut.rotation.x += 0.01;
    // });
    spin();

    scene.add(donut, cube);
  }
});

/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";

// const canvas = document.querySelector("canvas.webgl");
// const scene = new THREE.Scene();
// const gui = new dat.GUI();

// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// const textureLoader = new THREE.TextureLoader();

// const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
// const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const doorAmbientOcclusionTexture = textureLoader.load(
//   "/textures/door/ambientOcclusion.jpg"
// );
// const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
// const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
// const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
// const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
// const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

// // const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// // material.transparent = true;
// // material.alphaMap = doorAlphaTexture;
// // material.side = THREE.DoubleSide;

// // const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// gui.add(material, "wireframe");
// gui.add(material, "metalness", 0, 1);
// gui.add(material, "roughness", 0, 1);
// gui.add(material, "displacementScale", 0, 0.5);

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
// plane.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
// );

// scene.add(plane);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(0, 0, 10);
// scene.add(pointLight);

// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.y = 1;
// camera.position.z = 1;
// scene.add(camera);

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// let params = {
//   spin: false,
// };
// gui.add(params, "spin");

// const clock = new THREE.Clock();
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   if (params.spin) {
//     torus.rotation.y = 0.15 * elapsedTime;
//     sphere.rotation.y = 0.15 * elapsedTime;
//     plane.rotation.y = 0.15 * elapsedTime;

//     torus.rotation.x = 0.15 * elapsedTime;
//     sphere.rotation.x = 0.15 * elapsedTime;
//     plane.rotation.x = 0.15 * elapsedTime;
//   }

//   // Update controls
//   controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
