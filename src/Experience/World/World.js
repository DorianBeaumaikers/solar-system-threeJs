import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import Sun from "./Sun";
import Planet from "./Planet";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.sun = new Sun();
            this.earth = new Planet(2.5, 2.5, 2.5, 1, 0.0001);
            this.mars = new Planet(-5, 0, 5, 5, 0.0002);
            this.environment = new Environment();
        })
    }

    update() {
        if(this.earth){
            this.earth.update();
        }
        if(this.mars){
            this.mars.update();
        }
    }
}