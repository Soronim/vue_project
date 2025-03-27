<template>
    <LoginForm 
      v-model:login="login" 
      v-model:password="password" 
      @sendData="sendData"
    />
  </template>
  
  <script>
  import LoginForm from '@/components/forms/LoginForm.vue';
  import axios from 'axios';
  
  export default {
    name: 'LoginPage',
    components: {
      LoginForm
    },
    data() {
      return {
        login: '',
        password: ''
      }
    },
    methods: {
      async sendData() {
        try {
          // 1. Выполняем вход через Vuex
          const token = await this.$store.dispatch('loginInfo/login', {
            login: this.login,
            password: this.password
          });
  
          // 2. Получаем данные пользователя
          const userResponse = await axios.get('https://webcomp.bsu.ru/api/userData', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
  
          const userData = userResponse.data.data;
          console.log('User status:', userData.status);
  
          // 3. Перенаправляем по роли
          const redirectPath = userData.status === 'moderator' ? 'adminCabinet' : 'userCabinet';
          console.log('Redirecting to:', redirectPath);
          
        
           
           this.$router.push({ name: routeName })
          .then(() => console.log('Redirect successful'))
          .catch(err => {
            console.error('Router redirect failed:', err);
            // Fallback на изменение URL
            const redirectPath = userData.status === 'moderator' ? '/admin' : '/user';
            window.location.href = redirectPath;
        });
  
        } catch (error) {
          console.error("Login error:", error);
          alert("Неправильный логин или пароль");
        }
      }
    }
  }
  </script>