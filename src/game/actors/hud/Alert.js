import { Container, Text } from 'pixi.js';
import Rect from '../Rect';
import StateWatcher from '@/game/behaviours/StateWatcher';
import OpacityFadeOut from '@/game/behaviours/OpacityFadeOut';
import OpacityFadeIn from '@/game/behaviours/OpacityFadeIn';
import GeneralAnimation from '@/game/behaviours/GeneralAnimation';

class Alert extends Container {
    constructor (director) {
        super();
        this.w = 350;
        this.h = 150;
        this.director = director;
        this.moreText = [];
        this.interactive = true;
        this.pointertap = this.onClick.bind(this);

        const alertBg = new Rect(350, 150, 0x0);
        alertBg.alpha = 0.7;
        this.addChild(alertBg);

        this.addChild(this.alertText = new Text('', { fontFamily: '微软雅黑, 宋体', fill: 0xffffff, fontSize: 20, align: 'center' }));
        this.alertText.x = 8;
        this.alertText.y = 8;

        this.addChild(this.indicator = new Text('>', { fill: 0xffff00, fontSize: 15 }));
        this.indicator.x = 310;
        this.indicator.y = 124;
        director.installBehaviour(new GeneralAnimation(1.2, percent => {
            this.indicator.alpha = -4 * percent * percent + 4 * percent;
        }, -1));
        
        this.visible = false;

        director.installBehaviour(new StateWatcher(
            state => [state.alertText],
            this.showAlert.bind(this)
        ));
    }
    showAlert (text) {
        this.indicator.text = '好的';
        if (Array.isArray(text)) {
            this.alertText.text = text[0];
            this.moreText = text.slice(1);
            if (this.moreText.length > 0) {
                this.indicator.text = '然后';
            }
        } else if (text) {
            this.alertText.text = text;
        }
        this.justifyText();
        if (text) {
            if (!this.visible) {
                this.visible = true;
                this.director.installBehaviour(new OpacityFadeIn(this, 0.3));
            }
        } else {
            if (this.visible) {
                this.director.installBehaviour(new OpacityFadeOut(this, 0.3, false));
            }
        }
    }
    onClick () {
        if (this.moreText.length > 0) {
            const text = this.moreText.shift();
            this.alertText.text = text;
            this.justifyText();
            if (this.moreText.length > 0) {
                this.indicator.text = '然后';
            } else {
                this.indicator.text = '好的';
            }
        } else {
            this.director.gameState.alertText = '';
        }
    }
    justifyText () {
        this.alertText.x = (350 - this.alertText.width) / 2;
        this.alertText.y = (120 - this.alertText.height) / 2;
    }
}

export default Alert;
