import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";


const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(dracoLoader);

let model;
let controls;
const scene = new THREE.Scene();

loader.load('/models/RobotScene.glb', function (glb) {
    model = glb.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, -1, 0)
    scene.add(model);
});

const dynamicCamera = () => {
    const landscapeRatio = () => {
        return ((window.innerWidth / window.innerHeight) > 1)
    }

    if (!controls) return

    if (landscapeRatio()) {
        controls.minDistance = 9
        controls.maxDistance = 9
    } else {
        controls.minDistance = 20
        controls.maxDistance = 20
    }
}

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xB6FFFA, 2);
directionalLight.castshadow = true
scene.add(directionalLight);

const light = new THREE.PointLight(0xB6FFFA, 0, 0);
light.position.set(2, 50, 10);
scene.add(light);


//camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(-1, -1, 10);
camera.rotation.y = -0.05
camera.rotation.x = 0.15
scene.add(camera);
scene.background = new THREE.Color('black')


//renderer
const canvas = document.getElementById('container');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.innerWidth / window.innerHeight);
renderer.render(scene, camera);
// Orbit controls
controls = new OrbitControls(camera, canvas);

controls.update();

function animate() {
    requestAnimationFrame(animate);
    dynamicCamera();
    controls.update();
    renderer.render(scene, camera);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.innerWidth / window.innerHeight);

    dynamicCamera();
    controls.update();
}

window.addEventListener("resize", onWindowResize, false);

animate();