import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- CONFIGURACIÓN DE ESCENA ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// --- VARIABLES DE ANIMACIÓN ---
let mixer = null;
let modeloActual = null;
const clock = new THREE.Clock();
const loader = new GLTFLoader();

// --- ILUMINACIÓN (Tu configuración "Pro") ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 2);
mainLight.position.set(2, 5, 3);
scene.add(mainLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 1);
rimLight.position.set(-3, 2, -3);
scene.add(rimLight);

const techLight = new THREE.PointLight(0x4444ff, 1.5);
techLight.position.set(-2, 1, 2);
scene.add(techLight);

// --- CARGA INICIAL (Modelo Estático) ---
loader.load('../js/Male_MuscleWiki.glb', (gltf) => {
    modeloActual = gltf.scene;
    
    modeloActual.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: 0x444444,
                roughness: 0.3,
                metalness: 0.3
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(modeloActual);
    console.log("Sistema Anatómico Cargado.");
});

// --- FUNCIÓN PARA CARGAR ANIMACIONES (Invocada por botones de la IA) ---
window.cargarEjercicio = function(nombreArchivo) {
    console.log("Cargando y escalando ejercicio:", nombreArchivo);
    const ruta = `../js/${nombreArchivo}.glb`;

    loader.load(ruta, (gltf) => {
        if (modeloActual) {
            scene.remove(modeloActual);
        }

        modeloActual = gltf.scene;

        // --- LÓGICA DE ESCALADO AUTOMÁTICO ---
        const box = new THREE.Box3().setFromObject(modeloActual);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Definimos la altura deseada (ej. 1.8 unidades de Three.js)
        const alturaDeseada = 1.8; 
        const escalaFijada = alturaDeseada / size.y;
        
        modeloActual.scale.set(escalaFijada, escalaFijada, escalaFijada);
        
        // Reposicionar para que los pies queden en el suelo (0,0,0)
        modeloActual.position.y = (size.y * escalaFijada) / 2 - (center.y * escalaFijada);
        modeloActual.position.x = -(center.x * escalaFijada);
        modeloActual.position.z = -(center.z * escalaFijada);

        scene.add(modeloActual);

        // --- ANIMACIÓN ---
        mixer = new THREE.AnimationMixer(modeloActual);
        if (gltf.animations.length > 0) {
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
        }

        // --- MATERIAL (Igual al modelo original para coherencia) ---
        modeloActual.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x444444,
                    roughness: 0.3,
                    metalness: 0.3
                });
            }
        });

    }, undefined, (error) => {
        console.error("Error al cargar:", error);
    });
}
// --- CONTROLES Y RAYCASTER ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// --- LÓGICA DE INTERACCIÓN (Raycaster) ---
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const selected = intersects[0].object;
        const name = selected.name;
        const ignoredNames = ["Cuerpo", "Scene", "Node", "default", "Ground"];
        if (name.includes("Mesh") || ignoredNames.includes(name)) return;
        showMuscleInfo(selected);
    }
});

function showMuscleInfo(mesh) {
    const name = mesh.name.replace(/_/g, ' ');
    document.getElementById('muscle-name').innerText = name;

    // Resaltado visual (Emissive)
    scene.traverse(obj => { if(obj.isMesh && obj.material.emissive) obj.material.emissive.setHex(0x000000); });
    if(mesh.material.emissive) mesh.material.emissive.setHex(0xff0000);

    const panel = document.getElementById('ai-panel');
    panel.classList.add('active');
    document.getElementById('ai-title').innerText = "Entrenamiento: " + name;
    
    obtenerRutinaIA(name);
}

// --- INTEGRACIÓN CON n8n ---
async function obtenerRutinaIA(nombreMusculo) {
    const contentPanel = document.getElementById('ai-content');
    contentPanel.innerHTML = `<div class="loader"></div> Analizando fibras musculares...`;

    const N8N_WEBHOOK_URL = "https://jsredondo.app.n8n.cloud/webhook/67ae595e-a53d-45ba-a0e1-2bad0e55d3e0";

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ musculo: nombreMusculo })
        });

        const textoHTML = await response.text();
        contentPanel.innerHTML = textoHTML;

    } catch (error) {
        console.error("Error con n8n:", error);
        contentPanel.innerHTML = "Error al conectar con el cerebro de la IA.";
    }
}

// --- LOOP DE ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    // Si hay un mixer (una animación cargada), actualizarla
    if (mixer) {
        mixer.update(delta);
    }
    
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ajuste de ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Cerrar panel
document.getElementById('close-panel').addEventListener('click', () => {
    document.getElementById('ai-panel').classList.remove('active');
});