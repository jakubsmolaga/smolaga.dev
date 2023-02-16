import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelUrl from "./pc.glb?url";

const run = async (targetDiv: HTMLDivElement): Promise<void> => {
    if (targetDiv === null) throw new Error("failed to find the target div");

    const { width, height } = targetDiv.getBoundingClientRect();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    camera.position.y = 3;
    camera.rotation.x = -Math.PI * 0.25;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    window.onresize = () => {
        renderer.setSize(0, 0);
        const { width, height } = targetDiv.getBoundingClientRect();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    renderer.setSize(width, height);
    targetDiv.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(modelUrl);

    const pivot = new THREE.Group();
    pivot.position.set(0.1, 0.0, 0.0);
    // gltf.scene.add(pivot);
    pivot.add(gltf.scene);
    scene.add(pivot);
    gltf.scene.position.set(-0.3, 0.0, 0.0);
    // scene.add(pivot);
    // gltf.scene.position.x -= 0.7;

    // const light = new THREE.DirectionalLight(0xffffff, 1);
    const light = new THREE.SpotLight();
    light.position.set(0, 5, 5);
    light.power = 3;
    // light.rotation.set(-Math.PI * 0.25, 0, 0);
    light.target = pivot;


    // scene.add(gltf.scene);
    scene.add(light);

    const animate = (): void => {
        requestAnimationFrame(animate);
        // gltf.scene.rotation.y += 0.01;
        pivot.rotation.y += 0.02;
        renderer.render(scene, camera);
    };
    animate();
};

const buildToast = (msg: string): HTMLOutputElement => {
    const e = document.createElement('output');
    e.innerText = msg;
    e.classList.add('toast');
    return e;
};

const initCopyBtn = (): void => {
    const copyBtn = document.getElementById('copy-btn');
    const toastContainer = document.getElementById('toast-container');
    if (copyBtn === null) return console.error('failed to find #copy-btn');
    if (toastContainer === null) return console.error('failed to find #toast-container');
    copyBtn.onclick = () => {
        navigator.clipboard.writeText('contact@smolaga.dev');
        const toast = buildToast('Email copied to clipboard');
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
};


window.onload = async () => {
    initCopyBtn();
    const div3D = document.getElementById("div-3d");
    if (div3D === null) throw new Error("failed to find #div-3d element");
    if (div3D.tagName !== "DIV") throw new Error("#div-3d is not a div");
    await run(div3D as HTMLDivElement);
    div3D.style.opacity = '1.0';
};