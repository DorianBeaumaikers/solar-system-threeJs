import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = new Experience;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();

        this.setFakeInstance();

        this.setControls();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000000000);
        this.instance.position.set(6000, 4000, 8000);
    }

    setFakeInstance() {
        this.fakeInstance = this.instance.clone();
    }

    setControls() {
        this.controls = new OrbitControls(this.fakeInstance, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enablePan = false;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();

        this.fakeInstance.aspect = this.sizes.width / this.sizes.height;
        this.fakeInstance.updateProjectionMatrix();
    }

    changeCenter(object) {
        object.add(this.instance);
    }

    update() {
        this.instance.copy(this.fakeInstance);

        this.controls.update();
    }
}