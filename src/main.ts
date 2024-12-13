import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as colorCodes from './colors';

const { WHITE, GREY_69, GREY_70, RED, YELLOW } = colorCodes;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') || undefined,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.DodecahedronGeometry(10);
const material = new THREE.MeshStandardMaterial({ color: GREY_70 });


const dodecahedron = new THREE.Mesh(geometry, material);

// Add a wireframe on the object
const wireframeGeometry = new THREE.WireframeGeometry( geometry );
const wireframeMaterial = new THREE.LineBasicMaterial( { color: GREY_69 } );
const wireframe = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
dodecahedron.add( wireframe );

scene.add(dodecahedron);

// const pointLight = new THREE.PointLight(WHITE, 100);
// pointLight.position.set(0,0,0);

const ambientLight = new THREE.AmbientLight(WHITE, 0.8);
scene.add(ambientLight);

// lighting debug tools
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const colors = [ WHITE, RED, YELLOW ]
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: colors[THREE.MathUtils.randInt(0, colors.length - 1)] });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill([]).map(() => THREE.MathUtils.randFloatSpread(1000));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill([]).forEach(() => addStar());

// this happens every frame
function animate() {
  requestAnimationFrame(animate);

  dodecahedron.rotation.x += 0.001;
  dodecahedron.rotation.y += 0.0005;
  dodecahedron.rotation.z += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

animate();