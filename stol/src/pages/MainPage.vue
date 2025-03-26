<template>
    <MyMain :showPromo="true"/>
</template>
<script>

import MyMain from '@/components/MyMain.vue';

export default{
    name:'MainPage',
    components:{
        MyMain
    }
}
</script>