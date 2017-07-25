import { Container, Sprite, Text } from 'pixi.js';
import Rect from '../Rect';
import StateWatcher from '@/game/behaviours/StateWatcher';

class BottomHud extends Container {
    constructor (director) {
        super();
        this.director = director;
        this.w = 400;
        this.h = 45;

        this.bg = new Rect(this.w, this.h);
        this.bg.alpha = 0.8;
        this.addChild(this.bg);

        const hourglass = new Sprite(director.texture('hourglass'));
        hourglass.x = 8;
        hourglass.y = 8;
        this.addChild(hourglass);

        this.moveOrder = [];
        this.moveOrderContainer = new Container();
        this.moveOrderContainer.x = 250;
        this.addChild(this.moveOrderContainer);
        for (let i = 0; i < 4; i++) {
            const isDetective = i === 0 || i === 3;
            const texture = isDetective ? director.texture('detective') : director.texture('criminal');
            const dorc = new Sprite(texture);
            dorc.isDetective = isDetective;
            dorc.x = i * 38;
            dorc.y = 8;
            this.moveOrder.push(dorc);
            this.moveOrderContainer.addChild(dorc);
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

        this.roundText = new Text('', {
            fill: 0xffffff,
        });
        this.roundText.x = 50;
        this.roundText.y = 7;
        this.addChild(this.roundText);
        director.installBehaviour(new StateWatcher(
            state => [state.currentRound, state.totalRound, state.isDetectiveFirst, state.isWitnessOpen],
            this.setRound.bind(this)
        ));
    }
    setRound (current, total, isDetectiveFirst, isWitnessOpen) {
        this.roundText.text = `${current}/${total}`;
        this.setDetectiveFirst(isDetectiveFirst);
        this.setWitnessOpen(isWitnessOpen);
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
            dorc.x = i * 38;
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

export default BottomHud;
