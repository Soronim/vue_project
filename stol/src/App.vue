<template>
  <MyHeader></MyHeader>
  <MyMain></MyMain>
  <MyFooter></MyFooter>

  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

 
</template>

<script>

import MyFooter from './components/MyFooter.vue';
import MyHeader from './components/MyHeader.vue';
import MyMain from './components/MyMain.vue';

export default {
  name: 'App',
  components: {
      MyFooter,
      MyHeader,
      MyMain
  }
}
</script>

<style>
</style>
