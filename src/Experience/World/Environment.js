import * as THREE from "three";
import Experience from "../Experience";

/*
    This class mostly deals with the lighting of the scene
*/

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment');
        }

        // Setup
        this.setAmbientLight();
        this.setSunLight();
        this.setEnvironmentMap();
    }

    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.15);
        this.scene.add(this.ambientLight);
    }

    setSunLight() {
        this.sunLight = new THREE.PointLight('#ffffff', 1, 0, 0);
        this.sunLight.position.set(0, 0, 0);
        this.scene.add(this.sunLight);

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001);
        }
    }

    setEnvironmentMap() {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.texture.encoding = THREE.sRGBEncoding;

        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            })
        }
        this.environmentMap.updateMaterials();

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials);
        }
    }
}