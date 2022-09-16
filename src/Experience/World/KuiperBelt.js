import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";
import Experience from "../Experience";

export default class KuiperBelt {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;

        // Setup
        this.setGeometry();
        this.setMaterials();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(10000 * 3);

        for(let i = 0; i < 20000; i++) {
            const i3 = i * 3;

            var theta = Math.random() * 2 * Math.PI;
            var r = lerp(600000, 1000000, Math.random()) - (((Math.random() * 100)) * 1000);

            positions[i3] = r * Math.sin(theta);
            positions[i3 + 1] = (Math.random() - 0.5) * 5000;
            positions[i3 + 2] = r * Math.cos(theta);
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }

    setMaterials() {
        this.material = new THREE.PointsMaterial({
            size: 0.01,
            sizeAttenuation: true,
            depthWrite : false,
            blending: THREE.AdditiveBlending,
            color: '#1b1b1b'
        })
    }

    setMesh() {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh);
    }

    update() {
        const currentAngle = this.time.elapsed / 500000;

        this.mesh.rotation.y = - currentAngle;
    }
}