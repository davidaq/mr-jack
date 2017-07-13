import { Container, loaders } from 'pixi.js';
import Board from './actors/Board';
import Rect from './actors/Rect';
import Hud from './actors/Hud';
import OpacityFadeOut from './behaviours/OpacityFadeOut';

import seaTexture from '@/assets/white-hex.png';
import p1Texture from '@/assets/logo.png';
import { textures } from './resources';

class Director {
    constructor (state) {
        this.loader = new loaders.Loader();
        this.gameState = state;
        this.behaviours = [];
    }
    load (callback) {
        this.loader.add(seaTexture);
        this.loader.add(p1Texture);
        Object.keys(textures).forEach(textureName => {
            this.loader.add(textureName, textures[textureName]);
        });
        this.loader.load(() => {
            this.setupScene();
            callback();
        });
    }
    texture (name) {
        return this.loader.resources[name].texture;
    }
    setupScene () {
        this.root = new Container();

        this.board = new Board(this);
        this.root.addChild(this.board);

        this.root.addChild(new Hud(this));

        const fader = new Rect(window.innerWidth, window.innerHeight);
        this.root.addChild(fader);
        this.installBehaviour(new OpacityFadeOut(fader, 0.5, true));
    }
    installBehaviour (behaviour) {
        if (behaviour.isInstalled) {
            return;
        }
        behaviour.director = this;
        behaviour.isInstalled = true;
        behaviour.onInstall && behaviour.onInstall();
        behaviour.uninstall = () => {
            this.uninstallBehaviour(behaviour);
        };
        this.behaviours.push(behaviour);
    }
    uninstallBehaviour (behaviour) {
        if (!behaviour.isInstalled) {
            return;
        }
        const pos = this.behaviours.indexOf(behaviour);
        if (pos > -1) {
            this.behaviours.splice(pos, 1);
        }
        behaviour.onUninstall && behaviour.onUninstall();
        behaviour.director = null;
        behaviour.isInstalled = false;
    }
    update (elapse) {
        this.behaviours.forEach(item => item.update(elapse));
    }
    destroy () {
        this.gameState.destroy();
    }
}

export default Director;
