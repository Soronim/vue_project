import * as VueRouter from 'vue-router'
import MainPage from '../pages/MainPage'
import AboutPage from '@/pages/AboutPage.vue'
import MyLayout from '@/pages/MyLayout.vue'
import DishPage from '@/pages/DishPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import store from '../store/index.js'
import AdminCabinet from '../pages/admin/AdminCabinet.vue'

export default VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'myLayout',
            component:MyLayout,
            children:[
                {
                    path:'',
                    name:'mainPage',
                    component:MainPage
                },
                {
                    path:'/about',
                    name:'aboutPage',
                    component:AboutPage
                },
                {
                    path:'/dish/:id',
                    name:'dishPage',
                    component:DishPage
                },
            ]
        },
        {
            path:'/login',
            name:'loginPage',
            component:LoginPage
        },
        {
            path:'/admin',
            name:'MyLayout',
            component:MyLayout,
            beforeEnter:(to,from,next)=>{
                if(!store.getters.getLogged){
                    next({name:'loginPage'})
                }
                else{
                    next()
                }
            },
            children:[
                {
                    path:'',
                    name:'cabinet',
                    component:AdminCabinet
                },
            ]
        }
        
    ]
})