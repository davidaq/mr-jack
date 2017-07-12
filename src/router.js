/**
 * @file router
 * @author DavidAQ(153019747@qq.com)
 */

import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/pages/Hello';
import Game from '@/pages/Game';

Vue.use(Router);

export function createRouter() {
    let router = new Router({

        // history 模式，需要服务器后端配合做路由代理，将所有的前端路由同步代理到 /
        // mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            }
            return {
                x: 0,
                y: 0
            };
        },
        routes: [
            {
                path: '/',
                name: 'Hello',
                component: Hello
            },
            {
                path: '/game',
                name: 'Game',
                component: Game
            }
        ]
    });

    return router;
}
