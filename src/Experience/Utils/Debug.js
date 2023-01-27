import * as dat from 'lil-gui';

/*
    Adds a debug ui if '#debug' is added to the url
*/

export default class Debug {
    constructor() {
        this.active = window.location.hash === '#debug';

        if(this.active) {
            this.ui = new dat.GUI();
        }
    }
}