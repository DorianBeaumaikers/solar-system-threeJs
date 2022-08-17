import * as THREE from "three";
import Experience from "../Experience";

export default class Planet {
    constructor(x, z, distanceFromSun, angle, speed) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;

        this.x = x;
        this.z = z;
        this.distanceFromSun = distanceFromSun;
        this.angle = angle;
        this.speed = speed;

        // Setup
        this.setGeometry();
        this.setTextures();
        this.setMaterials();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(0.5, 64);
    }

    setTextures() {
        this.textures = {};
    }

    setMaterials() {
        this.material = new THREE.MeshStandardMaterial({});
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, 0, this.z);
        this.scene.add(this.mesh);
    }

    update() {
        const currentAngle = this.angle + (this.time.elapsed * this.speed);
        this.mesh.position.x = Math.cos(currentAngle) * this.distanceFromSun;
        this.mesh.position.z = Math.sin(currentAngle) * this.distanceFromSun;
    }
}