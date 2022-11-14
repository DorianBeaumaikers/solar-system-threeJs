import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import Sun from "./Sun";
import Planet from "./Planet";
import Stars from "./Stars";
import AsteroidBelt from "./AsteroidBelt";
import KuiperBelt from "./KuiperBelt";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.sun = new Sun();
            this.mercury = new Planet("mercury", 0.330, 0.24395, 5429, 3.7, 4222.6, 4600, 6980, 5790, 5667.03, 1186.95, 88, 0.0474, 0.206, 7, 0.034, 10.83, 1, this.resources.items.mercuryTexture);
            this.venus = new Planet("venus", 4.87, 0.6052, 5243, 8.9, 2802, 10750, 10890, 10820, 10799.74, 75.6, 224.7, 0.035, 0.007, 3.4, 177.4, 6.52, 2.2, this.resources.items.venusTexture);
            this.earth = new Planet("earth", 5.97, 0.6378, 5514, 9.8, 24, 14710, 15210, 14960, 14997.83, 255, 365.2, 0.0298, 0.017, 0, 23.4, 1574, 2.4, this.resources.items.earthTexture);
            this.mars = new Planet("mars", 0.642, 0.3396, 3934, 3.7, 24.7, 20670, 24930, 22800, 22699.05, 2143.2, 687, 0.0241, 0.094, 1.8, 25.2, 866, 1.3, this.resources.items.marsTexture);
            this.jupiter = new Planet("jupiter", 1898, 7.1492, 1326, 23.1, 9.9, 74060, 81640, 77850, 77806.43, 3817.1, 4331, 0.0131, 0.049, 1.3, 3.1, 45583, 30, this.resources.items.jupiterTexture);
            this.saturn = new Planet("saturn", 568, 6.0268, 687, 9, 10.7, 135760, 150650, 143200, 148811.49, 8151, 10747, 0.0097, 0.052, 2.5, 26.7, 36840, 25, this.resources.items.saturnTexture);
            this.uranus = new Planet("uranus", 86.8, 2.5559, 1270, 8.7, 17.2, 273270, 300140, 286700, 286696.19, 13202, 30589, 0.0068, 0.047, 0.8, 97.8, 14794, 11, this.resources.items.uranusTexture);
            this.neptune = new Planet("neptune", 102, 2.4764, 1638, 11, 16.1, 447110, 455890, 451500, 449972.77, 4950, 59800, 0.0054, 0.010, 1.8, 28.3, 9719, 10, this.resources.items.neptuneTexture);
            this.stars = new Stars();
            this.asteroidBelt = new AsteroidBelt();
            this.kuiperBelt = new KuiperBelt();
            this.environment = new Environment();
            this.experience.camera.changeCenter(this.sun.mesh, this.sun.minCameraDistance);
        })
    }

    update() {
        if(this.mercury){
            this.mercury.update();
        }
        if(this.venus){
            this.venus.update();
        }
        if(this.earth){
            this.earth.update();
        }
        if(this.mars){
            this.mars.update();
        }
        if(this.jupiter){
            this.jupiter.update();
        }
        if(this.saturn){
            this.saturn.update();
        }
        if(this.uranus){
            this.uranus.update();
        }
        if(this.neptune){
            this.neptune.update();
        }
        if(this.asteroidBelt){
            this.asteroidBelt.update();
        }
        if(this.kuiperBelt){
            this.kuiperBelt.update();
        }
    }
}