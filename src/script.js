import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

// Helpers
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
const gui = new dat.GUI();

// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/NormalMap.png');

// Setting up the environment
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);
const canvas = document.getElementById('webgl');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);

// Creating the sphere
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color(0x292929),
    metalness: 0.7,
    roughness: 0.2,
    normalMap: normalTexture
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const fixedLight = new THREE.PointLight(0xffffff, 0.1);
fixedLight.position.x = 2;
fixedLight.position.y = 3;
fixedLight.position.z = 4;
scene.add(fixedLight);

const firstLight = new THREE.PointLight(0xff0000, 2);
firstLight.position.set(-1.86, 1, -1.65);
firstLight.intensity = 10;
scene.add(firstLight);

const fistLightFolder = gui.addFolder('Light 1');
fistLightFolder.add(firstLight.position, 'x').min(-6).max(6).step(0.01);
fistLightFolder.add(firstLight.position, 'y').min(-3).max(3).step(0.01);
fistLightFolder.add(firstLight.position, 'z').min(-3).max(3).step(0.01);
fistLightFolder.add(firstLight, 'intensity').min(0).max(10).step(0.01);

const firstLightColor = { 
    color: 0xff0000
};
fistLightFolder.addColor(firstLightColor, 'color').onChange(() => {
    firstLight.color.set(firstLightColor.color)
});

const firstLightHelper = new THREE.PointLightHelper(firstLight, 1);
// scene.add(firstLightHelper);

const secondLight = new THREE.PointLight(0xe1ff, 2);
secondLight.position.set(2.13, -3, -1.98);
secondLight.intensity = 6.8;
scene.add(secondLight);

const secondLightFolder = gui.addFolder('Light 2');
secondLightFolder.add(secondLight.position, 'x').min(-6).max(6).step(0.01);
secondLightFolder.add(secondLight.position, 'y').min(-3).max(3).step(0.01);
secondLightFolder.add(secondLight.position, 'z').min(-3).max(3).step(0.01);
secondLightFolder.add(secondLight, 'intensity').min(0).max(10).step(0.01);

const secondLightColor = { 
    color: 0xe1ff
};
secondLightFolder.addColor(secondLightColor, 'color').onChange(() => {
    secondLight.color.set(secondLightColor.color)
});

const secondLightHelper = new THREE.PointLightHelper(secondLight, 1);
// scene.add(secondLightHelper);

const updateRenderer = () => {
    renderer.setSize(sizes.width, sizes.height);
};

// Responsiveness
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    updateRenderer();
});

// Animation
document.addEventListener('mousemove', onDocumentMouseMove);
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX);
    mouseY = (event.clientY - windowY);
}

const clock = new THREE.Clock();

const tick = () => {
    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = .5 * elapsedTime;

    sphere.rotation.y = .5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x);
    sphere.position.z += -.05 * (targetY - sphere.rotation.x);

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}
tick();