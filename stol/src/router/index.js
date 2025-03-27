import * as VueRouter from 'vue-router';
import MainPage from '../pages/MainPage';
import AboutPage from '@/pages/AboutPage.vue';
import MyLayout from '@/pages/MyLayout.vue';
import DishPage from '@/pages/DishPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import AdminCabinet from '../pages/admin/AdminCabinet.vue';
import UserCabinet from '../pages/user/UserCabinet.vue';
import store from '../store/index'

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
            beforeEnter:(to,from,next)=>{
                if(!store.getters.getLogged){
                    next({name:'loginPage'})
                }
                else{
                    next()
                }
            },
            children: [
                {
                    path: '',
                    name: 'adminCabinet',
                    component: AdminCabinet
                },
            ]
        },
        {
            path: '/user',
            name: 'userLayout',
            component: MyLayout,
            beforeEnter:(to,from,next)=>{
                if(!store.getters.getLogged){
                    next({name:'loginPage'})
                }
                else{
                    next()
                }
            },
            children: [
                {
                    path: '',
                    name: 'userCabinet',
                    component: UserCabinet
                },
            ]
        }
    ]
});