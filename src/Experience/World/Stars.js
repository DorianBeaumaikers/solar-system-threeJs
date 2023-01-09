import * as THREE from "three";
import Experience from "../Experience";

export default class Stars {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Setup
        this.setGeometry();
        this.setMaterials();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(5000 * 3);

        for(let i = 0; i < 5000; i++) {
            const i3 = i * 3;

            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);

            positions[i3] = (100000000 * (Math.random() + 1)) * Math.sin(theta) * Math.cos(phi);
            positions[i3 + 1] = (100000000 * (Math.random() + 1)) * Math.sin(theta) * Math.sin(phi);
            positions[i3 + 2] = (100000000 * (Math.random() + 1)) * Math.cos(theta);
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }

    setMaterials() {
        this.material = new THREE.PointsMaterial({
            size: 1,
            sizeAttenuation: false,
            depthWrite : false,
            blending: THREE.AdditiveBlending,
            color: '#ffffff'
        })
    }

    setMesh() {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh);
    }
}