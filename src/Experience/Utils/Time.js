import EventEmitter from "./EventEmitter.js";

/*
    This class manage time, who could have guessed
*/

export default class Time extends EventEmitter {
    constructor(){
        super();

        // Setup
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        window.requestAnimationFrame(() => {
            this.tick();
        })
    }

    tick(){
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        // Custom event to send 'tick' to other objects
        this.trigger('tick');

        window.requestAnimationFrame(() => {
            this.tick();
        })
    }
}