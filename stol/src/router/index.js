import * as VueRouter from 'vue-router';
import MainPage from '../pages/MainPage';
import AboutPage from '@/pages/AboutPage.vue';
import MyLayout from '@/pages/MyLayout.vue';
import DishPage from '@/pages/DishPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import AdminCabinet from '../pages/admin/AdminCabinet.vue';
import UserCabinet from '../pages/user/UserCabinet.vue';
import store from '../store/index'
import UserComments from '../pages/user/UserComments.vue';
import UserBids from '../pages/user/UserBids.vue';
import UserReservations from '../pages/user/UserReservations.vue';
import AdminComments from '../pages/admin/AdminComments.vue';
import AdminBids from '../pages/admin/AdminBids.vue';
import AdminReservations from '../pages/admin/AdminReservations.vue';


export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'mainLayout',
            component: MyLayout,
            children: [
                {
                    path: '',
                    name: 'mainPage',
                    component: MainPage
                },
                {
                    path: 'about',
                    name: 'aboutPage',
                    component: AboutPage
                },
                {
                    path: 'dish/:id',
                    name: 'dishPage',
                    component: DishPage,
                    props: true
                },
            ]
        },
        {
            path: '/login',
            name: 'loginPage',
            component: LoginPage
        },
        {
            path: '/admin',
            name: 'adminLayout',
            component: MyLayout,
            beforeEnter: (to, from, next) => {
                if (!store.getters['loginInfo/getLogged']) {
                next({ name: 'loginPage' });
                } else {
                next();
                }
            },
            children: [
                {
                    path: '',
                    name: 'adminCabinet',
                    component: AdminCabinet
                },
                {
                    path: '/adminComments',
                    name: 'adminComments',
                    component: AdminComments
                },
                {
                    path: '/adminBids',
                    name: 'adminBids',
                    component: AdminBids
                },
                {
                    path: '/adminReservations',
                    name: 'adminReservations',
                    component: AdminReservations
                },
            ]
            },
            {
            path: '/user',
            name: 'userLayout',
            component: MyLayout,
            beforeEnter: (to, from, next) => {
                if (!store.getters['loginInfo/getLogged']) {
                next({ name: 'loginPage' });
                } else {
                next();
                }
            },
            children: [
                {
                    path: '',
                    name: 'userCabinet',
                    component: UserCabinet
                },
                {
                    path: '/userComments',
                    name: 'userComments',
                    component: UserComments
                },
                {
                    path: '/userBids',
                    name: 'userBids',
                    component: UserBids
                },
                {
                    path: '/userReservations',
                    name: 'userReservations',
                    component: UserReservations
                },
            ]
        }
    ]
});