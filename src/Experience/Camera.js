import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/*
    This class manages the cameras
*/

export default class Camera {
    constructor() {
        this.experience = new Experience;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.center = null;

        this.setInstance();

        this.setFakeInstance();

        this.setControls();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000000000);
        this.instance.position.set(6000, 4000, 8000);
    }

    // Create a fake instance needed to circumvent some problems I had with the default threejs camera
    setFakeInstance() {
        this.fakeInstance = this.instance.clone();
    }

    setControls() {
        this.controls = new OrbitControls(this.fakeInstance, this.canvas);
        this.controls.minDistance = 1000;
        this.controls.maxDistance = 3000000;
        this.controls.enableDamping = true;
        this.controls.enablePan = false;
        this.controls.zoomSpeed = 1.5;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();

        this.fakeInstance.aspect = this.sizes.width / this.sizes.height;
        this.fakeInstance.updateProjectionMatrix();
    }

    // Teleport the camera so it rotate around the given mesh
    changeCenter(object, minCameraDistance) {
        this.center = object;
        object.add(this.instance);
        this.controls.minDistance = minCameraDistance;
    }

    update() {
        this.instance.copy(this.fakeInstance);

        this.controls.update();
    }
}