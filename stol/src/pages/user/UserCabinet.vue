<template>
  <div class="user-cabinet">
    <h1>Личный кабинет</h1>
    
    <UserHeader></UserHeader>
    
    <router-view></router-view>
    
    <button @click="logout" class="btn-danger">Выйти</button>
  </div>
</template>

<script>
import UserHeader from '@/components/user/UserHeader.vue';

export default {
  name: 'UserCabinet',
  components:{
    UserHeader
  },
  methods: {
    logout() {
      this.$store.dispatch('loginInfo/logout');
      this.$router.push('/');
    }
  }
}
</script>

