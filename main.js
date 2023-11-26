import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.06
});

const sphere = new THREE.Points(sphereGeometry, sphereMaterial);
scene.add(sphere);

const loader = new FontLoader();
let textGeometry;
let textMaterial;
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const options = {
        font: font,
        size: 1,
        height: 0.1
    };

    textGeometry = new TextGeometry('Tra My', options);
    textMaterial = new THREE.MeshBasicMaterial({
        color: 0xfc0303
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-2, 0, 0);
    sphere.add(textMesh);
});

camera.position.z = 15;
const ambientLight = new THREE.AmbientLight(0x404040);

scene.add(ambientLight);
renderer.render(scene, camera);

function animte() {
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animte);
}
animte()