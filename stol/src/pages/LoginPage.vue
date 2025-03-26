<template>
    <LoginForm v-model:login="login" v-model:password="password" @sendData="sendData()"/>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue';

export default{
    name:'LoginPage',
    beforeCreate(){
        document.body.className='text-center',
        document.getElementById("app").style.width="100%"
    },
    components:{
        LoginForm
    },
    data(){
        return{
            login:'',
            password:'',
        }
    },
    methods:{
        sendData() {
            this.$store.dispatch('login', {'login': this.login, 'password': this.password})
            .then((response) => {
                console.log('Login successful', response);
                this.$router.push({path: "/admin"});
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert("Неправильный логин или пароль");
            });
        }
    }
}
</script>
