import { Container, Sprite, Text } from 'pixi.js';
import Rect from './Rect';
import Card from './Card';
import StateWatcher from '@/game/behaviours/StateWatcher';
import OpacityFadeOut from '@/game/behaviours/OpacityFadeOut';
import OpacityFadeIn from '@/game/behaviours/OpacityFadeIn';

class BottomHud extends Container {
    constructor (director) {
        super();
        this.director = director;
        this.w = 400;
        this.h = 180;

        this.bg = new Rect(this.w, this.h);
        this.bg.alpha = 0.8;
        this.addChild(this.bg);

        this.cards = [];
        this.setCards([2,3,1,4]);

        this.statusText = null;

        director.installBehaviour(new StateWatcher(
            state => [state.statusText],
            this.setStatusText.bind(this)
        ));
    }
    setStatusText (text) {
        if (this.statusText) {
            this.director.installBehaviour(new OpacityFadeOut(this.statusText, 0.3, true));
            this.statusText = null;
        }
        if (text) {
            this.statusText = new Text(text, {
                fill: 0xffffff,
            });
            this.statusText.x = 8;
            this.statusText.y = 8;
            this.director.installBehaviour(new OpacityFadeIn(this.statusText, 0.3));
            this.addChild(this.statusText);
        }
    }
    setCards (cards) {
        this.cards.forEach(card => this.removeChild(card));
        this.cards = cards.map(card => new Card(this.director, card));
        this.cards.forEach((card, index) => {
            card.x = index * 98 + 8;
            card.y = 52;
            this.addChild(card);
        });
    }
}

export default BottomHud;
