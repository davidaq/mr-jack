import { Container, Sprite, Text, Point } from 'pixi.js';
import Rect from '../Rect';
import Card from './Card';
import StateWatcher from '@/game/behaviours/StateWatcher';
import OpacityFadeOut from '@/game/behaviours/OpacityFadeOut';
import OpacityFadeIn from '@/game/behaviours/OpacityFadeIn';
import GeneralAnimation from '@/game/behaviours/GeneralAnimation';
import { Role } from '@/game/constants';

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

        this.roleIndicator = null;
        director.installBehaviour(new StateWatcher(
            state => [state.myRole],
            this.setMyRole.bind(this)
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
            this.statusText.x = 40;
            this.statusText.y = 8;
            this.director.installBehaviour(new OpacityFadeIn(this.statusText, 0.3));
            this.addChild(this.statusText);
        }
    }
    setMyRole (role) {
        if (this.roleIndicator) {
            this.removeChild(this.roleIndicator);
            this.roleIndicator = null;
        }
        let roleTexture;
        let roleName;
        if (role === Role.Jack) {
            roleTexture = this.director.texture('criminal');
            roleName = '杰克';
        } else if (role === Role.Detective) {
            roleTexture = this.director.texture('detective');
            roleName = '侦探';
        }
        if (roleTexture) {
            const showRoleBg = new Container();
            showRoleBg.x = (this.w - 150) / 2;
            showRoleBg.y = -300;
            this.addChild(showRoleBg);
            const showRoleBgColor = new Rect(150, 150, 0x0);
            showRoleBgColor.alpha = 0.7;
            showRoleBg.addChild(showRoleBgColor);

            const showRoleDescText = new Text("您的身份是", { fill: 0xaaaaaa, fontSize: 16 });
            showRoleBg.addChild(showRoleDescText);
            showRoleDescText.x = (150 - showRoleDescText.width) / 2;
            showRoleDescText.y = 10;

            const showRoleText = new Text(roleName, { fill: 0xffffff, fontSize: 20 });
            showRoleBg.addChild(showRoleText);
            showRoleText.x = (150 - showRoleText.width) / 2;
            showRoleText.y = 110;

            const roleIndicator = new Sprite(roleTexture);
            this.roleIndicator = roleIndicator;
            this.addChild(roleIndicator);
            const roleIndicatorSX = showRoleBg.x + 50;
            const roleIndicatorSY = showRoleBg.y + 50;
            roleIndicator.x = roleIndicatorSX;
            roleIndicator.y = roleIndicatorSY;
            roleIndicator.scale = new Point(1, 1);
            roleIndicator.width = 50;
            roleIndicator.height = 50;

            this.director.installBehaviour(new GeneralAnimation(3, percent => {
                if (percent < 0.2) {
                    percent /= 0.2;
                    showRoleBg.alpha = percent;
                    roleIndicator.alpha = percent;
                } else if (percent < 0.8) {
                } else if (percent === 1) {
                    roleIndicator.x = 10;
                    roleIndicator.y = 8;
                    roleIndicator.width = 30;
                    roleIndicator.height = 30;
                    this.removeChild(showRoleBg);
                } else {
                    percent = (percent - 0.8) / 0.2;
                    showRoleBg.alpha = 1 - percent;
                    roleIndicator.x = roleIndicatorSX + (10 - roleIndicatorSX) * percent;
                    roleIndicator.y = roleIndicatorSY + (8 - roleIndicatorSY) * percent;
                    roleIndicator.width = 50 + (30 - 50) * percent;
                    roleIndicator.height = 50 + (30 - 50) * percent;
                }
            }));
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
