<template>
    <main>
        <div class = "container d-flex-column gap-5">
            <div class="row">
                <div class="col-12">
                    <h1>Личный кабинет администратора</h1>
                </div>
                <div class="col-5">
                    <UserInfo :userInfo="userInfo"/>
                </div>
            </div>
            <div class="row">
                <div clas="col-4">
                    <button class="btn btn-danger" @click="logout()">Выйти</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import UserInfo from '../../components/admin/UserInfo.vue'
import UserApi from '@/api/user';

export default{
    name:'AdminCabinet',
    components:{
        UserInfo
    },
    methods:{
        logout(){
            this.$store.dispatch('logout')
            .then(()=>this.$router.push({path:'/'}))
        },
        async fetchUserData(){
            try{
                this.userInfo=await UserApi.getUserData(this.my_token);
            } catch(error){
                console.error('Не удалось загрузить данные пользователя:', error);
            }
        }
    },
    mounted(){
        this.fetchUserData()
    },
    computed:{
        my_token(){
            return this.$store.getters.getToken
        }
    },
    data(){
        return{
            userInfo:{}
        }
    }
}
</script>