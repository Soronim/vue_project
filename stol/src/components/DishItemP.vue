<template>
    <div class="col-lg-4 menu-item">
        <a href="product.html"><img :src=imgSrc class="menu-img img-fluid" alt=""></a>
        <h4>{{ title }}</h4>
        <p class="ingredients">
            {{ ingredients }}
        </p>
        <p class="price">
            {{ cost }} руб
        </p>
    </div><!-- Menu Item -->
</template>
<script>
export default{
    name:'DishItemP',
    props:{
        imgSrc:String,
        cost:Number,
        title:String,
        ingredients:String,
        rating:Number,
        content:String
    }
}
</script>