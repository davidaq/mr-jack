import { Application, autoDetectRenderer } from 'pixi.js';
import State from './State';
import Director from './Director';
import * as GameSetup from './GameSetup';

const defaultOptions = () => ({
    $el: document.body,
    mode: 'tutor',
    setup: () => new GameSetup.TutorSetup(),
});

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || (fn => setTimeout(fn, 30));

window.now = () => performance.now ? performance.now() : performance.webkitNow ? performance.webkitNow() : Date.now();

class Engine {
    constructor () {
        this.adjustSize = this.adjustSize.bind(this);
        this.play = this.play.bind(this);

        this.stoped = false;
    }
    begin (options) {
        options = Object.assign(defaultOptions(), options);
        this.options = options;
        this.state = new State(this.options.setup());
        this.director = new Director(this.state);

        this.renderer = autoDetectRenderer(100, 100, 
            { antialias: true, transparent: false, resolution: 1 });
        Object.assign(this.renderer.view.style, {
            width: '100%',
            height: '100%',
            display: 'block',
        });
        this.renderer.autoResize = true;
        this.adjustSize();
        this.options.$el.appendChild(this.renderer.view);
        window.addEventListener('resize', this.adjustSize);
        
        this.director.load(() => {
            this.prevFrameTime = now();
            requestAnimationFrame(this.play);
        });
    }
    adjustSize () {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }
    play () {
        if (this.stoped) {
            return;
        }
        const curTime = now();
        this.director.update((curTime - this.prevFrameTime) / 1000);
        this.renderer.render(this.director.root);
        this.prevFrameTime = curTime;
        requestAnimationFrame(this.play);
    }
    destroy () {
        this.stoped = true;
        window.removeEventListener('resize', this.adjustSize);
    }
}

export default Engine;
