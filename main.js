import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log('🚀 3D Cup Viewer starting...');

// Scene setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#1a1a2e');

// Camera
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(5, 3, 8);

// Renderer
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    preserveDrawingBuffer: true,
    alpha: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
container.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI;
controls.target.set(0, 0, 0);
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;
controls.update();

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.5));
const light1 = new THREE.DirectionalLight(0xffffff, 3);
light1.position.set(5, 10, 5);
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
light2.position.set(-5, 0, -5);
scene.add(light2);

// State
let model;
let wireframeMode = false;

// DOM elements
const loaderElement = document.getElementById('loader');
const textureInput = document.getElementById('texture-input');
const textureBtn = document.getElementById('texture-btn');

// ============ LOAD DEFAULT MODEL ============

function loadDefaultModel() {
    loaderElement.classList.add('active');
    console.log('📦 Loading model from models/DW 8cups.glb...');
    
    const loader = new GLTFLoader();
    
    loader.load(
        'models/DW 8cups.glb',
        (gltf) => {
            console.log('✅ Model loaded!');
            model = gltf.scene;
            
            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            console.log('📏 Model size:', size);
            
            model.position.set(-center.x, -center.y, -center.z);
            
            // Scale if needed
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 10) {
                model.scale.setScalar(10 / maxDim);
            }
            
            // Apply default texture if exists
            loadDefaultTexture();
            
            // Setup meshes
            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    if (node.material) {
                        node.userData.originalMaterial = node.material.clone();
                    }
                }
            });
            
            scene.add(model);
            
            // Update orbit target
            const newBox = new THREE.Box3().setFromObject(model);
            const newCenter = newBox.getCenter(new THREE.Vector3());
            controls.target.copy(newCenter);
            
            loaderElement.classList.remove('active');
            console.log('✅ Model ready!');
        },
        (progress) => {
            if (progress.total > 0) {
                const percent = (progress.loaded / progress.total * 100).toFixed(0);
                loaderElement.innerHTML = `<span class="spinner"></span> Loading... ${percent}%`;
            }
        },
        (error) => {
            console.error('❌ Error loading model:', error);
            loaderElement.classList.remove('active');
            showToast('Model not found! Check models/DW 8cups.glb', 'error');
        }
    );
}

function loadDefaultTexture() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        'models/img_mokup.jpg',
        (texture) => {
            console.log('✅ Default texture loaded!');
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.flipY = false;
            applyTextureToModel(texture);
        },
        undefined,
        () => {
            console.log('ℹ️ No default texture found, using original');
        }
    );
}

// ============ TEXTURE REPLACEMENT ============

textureBtn.addEventListener('click', () => {
    textureInput.click();
});

textureInput.addEventListener('change', (e) => {
    if (e.target.files[0]) {
        const file = e.target.files[0];
        console.log('🖼️ Loading new texture:', file.name);
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(event.target.result, (texture) => {
                console.log('✅ New texture loaded!');
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.flipY = false;
                
                applyTextureToModel(texture);
                showToast(`Texture applied: ${file.name}`, 'success');
            });
        };
        reader.readAsDataURL(file);
        
        // Reset input to allow loading same file again
        e.target.value = '';
    }
});

function applyTextureToModel(texture) {
    if (!model) {
        console.warn('⚠️ No model loaded yet');
        return;
    }
    
    console.log('🔄 Applying texture to model...');
    let applied = 0;
    
    model.traverse((node) => {
        if (node.isMesh && node.material) {
            const materials = Array.isArray(node.material) ? node.material : [node.material];
            
            materials.forEach((material) => {
                // Replace if material has a map
                if (material.map) {
                    material.map = texture;
                    material.needsUpdate = true;
                    applied++;
                    console.log(`  ✅ Texture replaced on: "${node.name}"`);
                }
            });
        }
    });
    
    if (applied === 0) {
        console.warn('⚠️ No textures found to replace. Model may use different material setup.');
        showToast('No textures found in model materials', 'error');
    } else {
        console.log(`📊 Textures replaced: ${applied}`);
    }
}

// ============ CONTROLS ============

function resetView() {
    camera.position.set(5, 3, 8);
    controls.target.set(0, 0, 0);
    controls.update();
}

const backgrounds = [
    '#1a1a2e', '#2d3436', '#ffffff', '#dfe6e9',
    '#00b894', '#6c5ce7', '#fd79a8', '#fdcb6e'
];
let currentBg = 0;

function changeBackground() {
    currentBg = (currentBg + 1) % backgrounds.length;
    scene.background = new THREE.Color(backgrounds[currentBg]);
}

function toggleWireframe() {
    wireframeMode = !wireframeMode;
    document.getElementById('wireframe-btn').classList.toggle('active', wireframeMode);
    
    if (model) {
        model.traverse((node) => {
            if (node.isMesh && node.material) {
                const materials = Array.isArray(node.material) ? node.material : [node.material];
                materials.forEach(mat => mat.wireframe = wireframeMode);
            }
        });
    }
}

function toggleAutoRotate() {
    controls.autoRotate = !controls.autoRotate;
    document.getElementById('autorotate-btn').classList.toggle('active', controls.autoRotate);
}

function takeScreenshot() {
    renderer.render(scene, camera);
    const link = document.createElement('a');
    link.download = 'model-screenshot.png';
    link.href = renderer.domElement.toDataURL('image/png');
    link.click();
    showToast('Screenshot saved! 📸', 'success');
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    if (type === 'error') {
        toast.style.background = 'rgba(255, 107, 107, 0.9)';
    }
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
}

// Event listeners
document.getElementById('reset-btn').addEventListener('click', resetView);
document.getElementById('bg-btn').addEventListener('click', changeBackground);
document.getElementById('wireframe-btn').addEventListener('click', toggleWireframe);
document.getElementById('autorotate-btn').addEventListener('click', toggleAutoRotate);
document.getElementById('screenshot-btn').addEventListener('click', takeScreenshot);

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'r': resetView(); break;
        case 'b': changeBackground(); break;
        case 'w': toggleWireframe(); break;
        case 'a': toggleAutoRotate(); break;
        case 's': takeScreenshot(); break;
    }
});

// Resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// ============ START ============
loadDefaultModel();
animate();

console.log('✅ 3D Viewer ready!');
console.log('🖼️ Click "Replace Texture" to change the texture');