import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: () =>
                import ('@/views/LoginPage.vue'),
        },
        {
            path: '/list',
            component: () =>
                import ('@/views/BoardList.vue'),
            meta: { auth: true },
        },
        {
            path: '/add',
            component: () =>
                import ('@/views/InsertBoard.vue'),
            meta: { auth: true },
        },
        {
            path: '/board/view/:id',
            component: () =>
                import ('@/views/PostEditPage.vue'),
            meta: { auth: true },
        },
        // {
        //     path: '/signup',
        //     component: () =>
        //         import ('@/views/SignupPage.vue'),
        // },
        //   {
        //     path: '/main',
        //     component: () => import('@/views/MainPage.vue'),
        //     meta: { auth: true },
        //   },
    ],
});
router.beforeEach((to, from, next) => {
    // 로그인 안했을때
    if (to.meta.auth && !store.getters.isLogin) {
        console.log('인증이 필요합니다.');
        next('/login');
        return; // if 문을 타서 next 로 로그인하고 나서 또 next() 호출하게됨
    }
    // 로그인 됬을때 다음 페이지로
    next();
});
export default router;