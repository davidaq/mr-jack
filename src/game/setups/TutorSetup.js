import { Terain, Role } from '../constants';
import { until, sleep } from '@/util/async';
import HumanDecider from '../deciders/HumanDecider';
import TutorDecider from '../deciders/TutorDecider';

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
        await sleep(2);
        state.alertText = [
            '杰克明面上的身份是建筑师\n接下来的目标是让他移动到出口',
            '实际游戏当中，是杰克的人物是随机的',
        ];
        await until(() => !state.alertText);
        state.deciders[Role.Jack] = new HumanDecider(state);
        state.deciders[Role.Detective] = new TutorDecider(state);
        while (true) {
            // distribute cards
            // lock cards
            await sleep(2);
            state.alertText = [
                '您的游戏过程是通过使用卡牌来进行的\n使用卡牌可让对应人物移动或使用技能',
                '现在请您选择第二张卡牌\n移动建筑师到出口旁边\n并在任意空地上建造一个房屋',
            ];
            await until(() => !state.alertText);
            state.statusText = '请选择第二张卡牌';
            // unlock second card
            // lock selectable tiles
            state.currentRound = 1;
            state.roundMove = 1;
            await state.decideNextMove();
            /*if ()*/ {
                break;
            }
            // restore position and cards
            state.alertText = [
                '请您暂且按照教程指示操作',
            ];
            await until(() => !state.alertText);
        }
    }

    destroy () {

    }
}

export default TutorSetup;
