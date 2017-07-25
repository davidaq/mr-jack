import { Terain, Role } from '../constants';
import { until, sleep } from '@/util/async';

export class TutorSetup {
    constructor () {
        this.width = 6;
        this.height = 6;
    }

    initialize (state) {
        const { Sea: S, OpenSpace: O } = Terain;
        state.board.terain = [
            S, O, O, O, O, S,
            O, O, O, O, O, O,
            O, O, O, O, O, O,
            S, O, O, O, O, S,
            S, S, S, S, O, O,
            S, S, S, S, S, S,
        ];
        this.gamePlay(state).catch(err => console.error(err));
    }

    async gamePlay (state) {
        state.alertText = [
            '欢迎来到Mr.Jack手机网页版\n本教程将带您了解游戏玩法',
            '本游戏有两个玩家互相对抗\n分别扮演 杰克 与 侦探',
        ];
        await until(() => !state.alertText);
        await sleep(0.3);
        state.myRole = Role.Jack;
        await sleep(3);
        state.alertText = [
            '您将首先扮演杰克玩家\n目标是将自己移动到地图的出口',
            '每局游戏中，场上会出现若干人物\n其中一个就是隐藏身份的杰克',
        ];
        await until(() => !state.alertText);
        // put characters
        // set jack character
        await sleep(3);
        state.alertText = [
            '您可以通过卡片让人物移动或使用技能',
        ];
        await until(() => !state.alertText);
        state.statusText = '请选择第二角色';
    }

    destroy () {

    }
}

export default TutorSetup;
