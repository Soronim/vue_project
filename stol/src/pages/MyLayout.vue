<template>
    <MyHeader></MyHeader>
    <router-view></router-view>
    <MyFooter>2025 IT-BURMALDA</MyFooter>
</template>
<script>
import MyFooter from '@/components/MyFooter.vue';
import MyHeader from '@/components/MyHeader.vue';


export default{
    name:'MyLayout',
    components:{
        MyFooter,
        MyHeader,
    }
}
</script>