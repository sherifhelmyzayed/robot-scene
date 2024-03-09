import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";


const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(dracoLoader);

let model;
const scene = new THREE.Scene();


const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load('/stars-bg.jpg');


loader.load('/models/RobotScene.glb', function (glb) {
    model = glb.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);
});


//light
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);



const directionalLight = new THREE.DirectionalLight(0xB6FFFA, 2);
scene.add(directionalLight);


const light = new THREE.PointLight(0xB6FFFA, 1, 1);
light.position.set(2, 50, 10);
scene.add(light);


//camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 10);
scene.add(camera);


//renderer
const canvas = document.getElementById('container');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.innerWidth / window.innerHeight)
renderer.render(scene, camera);


// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();