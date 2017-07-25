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
            '您将首先扮演杰克玩家\n目标是在有限的回合内\n将自己移动到地图的出口',
            '每局游戏中，场上会出现若干角色\n其中一个角色的隐藏身份是杰克',
        ];
        await until(() => !state.alertText);
    }

    destroy () {

    }
}

export default TutorSetup;

const t = [], m = [];
function S_(a1, a2, k1, k2) {
    if (a1.length <= k1 || a2.length <= k2) {
        return 0;
    }
    if (a1[k1] === a2[k2]) {
        m[this] = { n: K(a1, a2, k1 + 1, k2 + 2), v: a1[k1], k: k1 };
        return S(a1, a2, k1 + 1, k2 + 1) + 1;
    } else {
        const v1 = S(a1, a2, k1, k2 + 1);
        const v2 = S(a1, a2, k1 + 1, k2);
        if (v1 > v2) {
            m[this] = { n: K(a1, a2, k1, k2 + 1) };
            return v1;
        } else {
            m[this] = { n: K(a1, a2, k1 + 1, k2) };
            return v2;
        }
    }
}

function K(a1, a2, k1, k2) {
    return k1 * 100 + k2;
}

function S (...args) {
    const k = K(...args);
    if (!t[k]) {
        t[k] = S_.call(k, ...args);
    }
    return t[k];
}

console.log(S([6, 7, 9, 8, 3, 6, 5], [7, 6, 9, 8, 3, 1, 5], 0, 0));
let p = 0;
while (true) {
    if (!m[p]) break;
    if ('v' in m[p]) {
        console.log(m[p].v, m[p].k);
    }
    p = m[p].n;
}
console.log(m);

