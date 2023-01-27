import EventEmitter from "./EventEmitter.js";

/*
    Class to manage the screen sizes
*/

export default class Sizes extends EventEmitter {
    constructor(){
        super();

        // Setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            // Custom event to warn other objects
            this.trigger('resize');
        })
    }
}