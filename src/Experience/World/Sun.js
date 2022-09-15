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
        this.geometry = new THREE.SphereGeometry(696.34, 640);
    }

    setTextures() {
        this.textures = {};

        this.textures.color = this.resources.items.sunTexture;
        this.textures.color.encoding = THREE.sRGBEncoding
    }

    setMaterials() {
        this.material = new THREE.MeshBasicMaterial({
            map: this.textures.color,
        });
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }
}