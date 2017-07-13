import { Container, Sprite, Text } from 'pixi.js';
import Rect from './Rect';
import Card from './Card';
import CardHudPosition from '@/game/behaviours/CardHudPosition';
import StateWatcher from '@/game/behaviours/StateWatcher';

class CardHud extends Container {
    constructor (director) {
        super();
        this.director = director;
        this.w = 400;
        this.h = 180;

        director.installBehaviour(new CardHudPosition(this));

        this.bg = new Rect(this.w, this.h);
        this.bg.alpha = 0.8;
        this.addChild(this.bg);

        const hourglass = new Sprite(director.texture('hourglass'));
        hourglass.x = 8;
        hourglass.y = 8;
        this.addChild(hourglass);

        this.moveOrder = [];
        for (let i = 0; i < 4; i++) {
            const isDetective = i === 0 || i === 3;
            const texture = isDetective ? director.texture('detective') : director.texture('criminal');
            const dorc = new Sprite(texture);
            dorc.isDetective = isDetective;
            dorc.x = 250 + i * 38;
            dorc.y = 8;
            this.moveOrder.push(dorc);
            this.addChild(dorc);
        }

        this.witnessOpen = new Sprite(director.texture('witnessOpen'));
        this.witnessOpen.x = 150;
        this.witnessOpen.y = 8;
        this.addChild(this.witnessOpen);
        this.witnessClose = new Sprite(director.texture('witnessClose'));
        this.witnessClose.x = 150;
        this.witnessClose.y = 8;
        this.addChild(this.witnessClose);
        this.witnessClose.visible = false;

        this.roundText = null;
        director.installBehaviour(new StateWatcher(
            state => [state.currentRound, state.totalRound, state.isDetectiveFirst, state.isWitnessOpen],
            this.setRound.bind(this)
        ));

        this.cards = [];
        this.setCards([2,3,1,4]);
        this.setWitnessOpen(false);
    }
    setRound (current, total, isDetectiveFirst, isWitnessOpen) {
        if (this.roundText) {
            this.removeChild(this.roundText);
        }
        this.roundText = new Text(`${current}/${total}`, {
            fill: 0xffffff,
        });
        this.roundText.x = 50;
        this.roundText.y = 7;
        this.addChild(this.roundText);
        this.setDetectiveFirst(isDetectiveFirst);
        this.setWitnessOpen(isWitnessOpen);
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
    setDetectiveFirst (isDetectiveFirst = true) {
        if (this.moveOrder[0].isDetective === isDetectiveFirst) {
            return;
        }
        let t = this.moveOrder[0];
        this.moveOrder[0] = this.moveOrder[1];
        this.moveOrder[1] = t;
        t = this.moveOrder[2];
        this.moveOrder[2] = this.moveOrder[3];
        this.moveOrder[3] = t;
        this.moveOrder.forEach((dorc, i) => {
            dorc.x = 250 + i * 38;
        });
    }
    setWitnessOpen (isOpen = true) {
        if (this.witnessOpen.visible === isOpen) {
            return;
        }
        this.witnessOpen.visible = isOpen;
        this.witnessClose.visible = !isOpen;
    }
}

export default CardHud;
