import { Container, loaders } from 'pixi.js';
import Root from './actors/Root';

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
            this.root = new Root(this);
            callback();
        });
    }
    texture (name) {
        return this.loader.resources[name].texture;
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
