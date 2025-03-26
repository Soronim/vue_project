<template>
    <main class="main">


        <!-- Dish Section -->
        <section id="dish-section" class="dish-section section">

            <div class="container" data-aos="fade-up">
                <div class="row">
                    <!-- Dish Image -->
                    <div class="col-lg-6">
                        <img :src=item.imgSrc>
                        <div class="rating mt-3">
                            <span class="stars">★★★★☆</span>
                            <span class="rating-value">{{ item.rating }}</span>
                            <span class="votes">(48 оценок)</span>
                        </div>
                    </div>

                    <!-- Dish Info -->
                    <div class="col-lg-6">
                        <div class="dish-header">
                            <h2>{{ item.title }}</h2>
                            <div class="price">{{ item.cost }}</div>

                        </div>

                        <div class="dish-details mt-4">
                            <h4>Описание</h4>
                            <p>{{ item.content }}</p>

                            <h4 class="mt-4">Ингредиенты</h4>
                            <ul class="ingredients-list">
                                {{ item.ingredients }}
                            </ul>


                        </div>
                    </div>
                </div>

                <!-- Additional Info -->
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="additional-info">


                            <h4 class="mt-4">Отзывы</h4>
                            <div class="reviews">
                                <div class="review">
                                    <div class="review-header">
                                        <span class="review-author">Иван Петров</span>
                                        <span class="review-date">15.10.2023</span>
                                        <span class="review-rating">★★★★★</span>
                                    </div>
                                    <div class="review-text">Очень вкусный плов, как у моей бабушки! Мясо мягкое, рис
                                        рассыпчатый. Рекомендую!</div>
                                </div>

                                <div class="review">
                                    <div class="review-header">
                                        <span class="review-author">Анна Сидорова</span>
                                        <span class="review-date">12.10.2023</span>
                                        <span class="review-rating">★★★★☆</span>
                                    </div>
                                    <div class="review-text">Хороший плов, но мог бы быть и повкуснее. Иногда попадается
                                        слишком жирный.</div>
                                </div>
                            </div>

                            <div class="text-center mt-4">
                                <a href="cafeteria.html" class="btn btn-primary">Вернуться в меню столовой</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section><!-- /Dish Section -->

    </main>
</template>
<script>
export default {
    name: 'DishPage',
    components: {

    },
    data() {
        return {
            id: 0,
            item: {}
        }
    },
    created() {
        const record_id = this.$route.params.id
        if (record_id) {
            this.id = record_id
            this.item = this.getDish(record_id)
        }
    },
    methods: {
        getDish(record_id) {
            var dishItems = [
                {
                    id: 1,
                    imgSrc: '/img/menu/menu-item-1.png',
                    rating: 52,
                    title: 'Lorem',
                    content: 'aisf nuaiu na iunas iuasn iasi ai unas',
                    cost: 3000,
                    ingredients: 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    id: 2,
                    imgSrc: '/img/menu/menu-item-1.png',
                    rating: 52,
                    title: 'Lorem',
                    content: 'aisf nuaiu na iunas iuasn iasi ai unas',
                    cost: 3000,
                    ingredients: 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    id: 3,
                    imgSrc: '/img/menu/menu-item-1.png',
                    rating: 52,
                    title: 'Lorem',
                    content: 'aisf nuaiu na iunas iuasn iasi ai unas',
                    cost: 3000,
                    ingredients: 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    id: 4,
                    imgSrc: '/img/menu/menu-item-1.png',
                    rating: 52,
                    title: 'Lorem',
                    content: 'aisf nuaiu na iunas iuasn iasi ai unas',
                    cost: 3000,
                    ingredients: 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    id: 5,
                    imgSrc: '/img/menu/menu-item-1.png',
                    rating: 52,
                    title: 'Lorem',
                    content: 'aisf nuaiu na iunas iuasn iasi ai unas',
                    cost: 3000,
                    ingredients: 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
            ]
            var it = dishItems.find(({ id }) => id == record_id)
            return it
        }
    }
}
</script>
