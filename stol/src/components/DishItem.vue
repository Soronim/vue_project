<template>
    <div class="col-lg-4 menu-item">
        <router-link :to="{ name: 'dishPage', params: { id: dishId } }" class="menu-img img-fluid">
            <img :src="imgSrc" class="menu-img img-fluid" alt="">
        </router-link>
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
export default {
    name: 'DishItem',
    props: ['dishData'],
    data() {
        return {
            dishId: this.dishData.id,
            imgSrc: this.dishData.imgSrc,
            cost: this.dishData.cost,
            title: this.dishData.title,
            ingredients: this.dishData.ingredients,
            rating: this.dishData.rating,
            content: this.dishData.content

        }
    }
}
</script>