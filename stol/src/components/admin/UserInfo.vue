<template>
    <div class="card">
        <div class="card-body">
            <h5>INFO</h5>
        </div>
    </div>
</template>

<script>
export default{
    name:'UserInfo',
    props:['userInfo'],
    data(){
        return{
            showTrackInfo:false,
        }
    },
    methods:{
        showInfo(){
            this.showTrackInfo=true;
        }
    }
}
</script>