import * as THREE from "three";
import Experience from "../Experience";

export default class Sun {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Setup
        this.setGeometry();
        this.setTextures();
        this.setMaterials();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(1, 64);
    }

    setTextures() {
        this.textures = {};
    }

    setMaterials() {
        this.material = new THREE.MeshBasicMaterial({color:"#ffa500"});
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }
}