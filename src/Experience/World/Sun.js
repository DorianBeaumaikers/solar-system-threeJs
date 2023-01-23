import * as THREE from "three";
import Experience from "../Experience";

export default class Sun {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.minCameraDistance = 500;
        this.name = "sun";

        // Setup
        this.setGeometry();
        this.setTextures();
        this.setMaterials();
        this.setMesh();
        this.setListeners();
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(69.634, 6400);
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

    setListeners() {
        document.querySelector("#sunLocate").addEventListener("click", (e) => {
            this.experience.camera.changeCenter(this.mesh, this.minCameraDistance);

            if(this.experience.world.lastHighlitedOrbit) {
                document.querySelector("#" + this.experience.world.lastHighlitedOrbit.name).classList.add("yellowText");
                document.querySelector("#" + this.experience.world.lastHighlitedOrbit.name).classList.remove("blueText");
                if(this.experience.world.lastHighlitedOrbit.ellipse) {
                    this.experience.world.lastHighlitedOrbit.ellipse.material.color = new THREE.Color("#101010");
                }
            }

            document.querySelector("#" + this.name).classList.remove("yellowText");
            document.querySelector("#" + this.name).classList.add("blueText");

            this.experience.world.lastHighlitedOrbit = this;

            let infos = document.querySelector("#infos");
            infos.style.visibility = "hidden";
        })
    }
}