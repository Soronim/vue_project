<template>
    <section id="menu" class="menu section">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>Меню</h2>
            <p><span>Наше</span> <span class="description-title">Меню</span></p>
        </div><!-- End Section Title -->

        <div class="container">

            <ul class="nav nav-tabs d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">

                <li class="nav-item">
                    <a class="nav-link active show" data-bs-toggle="tab" data-bs-target="#menu-starters">
                        <h4>Все</h4>
                    </a>
                </li><!-- End tab nav item -->

                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu-breakfast">
                        <h4>Первое</h4>
                    </a><!-- End tab nav item -->

                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu-lunch">
                        <h4>Второе</h4>
                    </a>
                </li><!-- End tab nav item -->

                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu-dinner">
                        <h4>Десерты</h4>
                    </a>
                </li><!-- End tab nav item -->

            </ul>

            <div class="tab-content" data-aos="fade-up" data-aos-delay="200">

                <div class="tab-pane fade active show" id="menu-starters">

                    <div class="tab-header text-center">
                        <p>Меню</p>
                        <h3>Все</h3>
                    </div>

                    <div class="row gy-5">

                        <DishItem v-for="(item,index) in dishItems" :key ="index" :dishData="item"/>
                        



                    </div>
                </div><!-- End Starter Menu Content -->

                <div class="tab-pane fade" id="menu-breakfast">

                    <div class="tab-header text-center">
                        <p>Меню</p>
                        <h3>Второе</h3>
                    </div>

                    <div class="row gy-5">

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                    </div>
                </div><!-- End Breakfast Menu Content -->

                <div class="tab-pane fade" id="menu-lunch">

                    <div class="tab-header text-center">
                        <p>Меню</p>
                        <h3>Первое</h3>
                    </div>

                    <div class="row gy-5">

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                    </div>
                </div><!-- End Lunch Menu Content -->

                <div class="tab-pane fade" id="menu-dinner">

                    <div class="tab-header text-center">
                        <p>Меню</p>
                        <h3>Десерты</h3>
                    </div>

                    <div class="row gy-5">

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                        <DishItemP imgSrc="/img/menu/menu-item-1.png" rating="52" title="Lorem"
                            content="aisf nuaiu na iunas iuasn iasi ai unas" cost="3000"
                            ingredients=" iunadiu daduaiudnaidund  aiudnaidun  aidun" />

                    </div>
                </div><!-- End Dinner Menu Content -->

            </div>

        </div>

    </section><!-- /Menu Section -->
</template>
<script>
import DishItem from './DishItem.vue';
import DishItemP from './DishItemP.vue';

export default {
    name: 'DishList',
    components: {
        DishItemP,
        DishItem
        
    },
    data() {
        return {
            dishItems: [
                {
                    'id':1,
                    'imgSrc': '/img/menu/menu-item-1.png',
                    'rating': 52,
                    'title': 'Lorem',
                    'content': 'aisf nuaiu na iunas iuasn iasi ai unas',
                    'cost': 3000,
                    'ingredients': 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    'id':2,
                    'imgSrc': '/img/menu/menu-item-1.png',
                    'rating': 52,
                    'title': 'Lorem',
                    'content': 'aisf nuaiu na iunas iuasn iasi ai unas',
                    'cost': 3000,
                    'ingredients': 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    'id':3,
                    'imgSrc': '/img/menu/menu-item-1.png',
                    'rating': 52,
                    'title': 'Lorem',
                    'content': 'aisf nuaiu na iunas iuasn iasi ai unas',
                    'cost': 3000,
                    'ingredients': 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    'id':4,
                    'imgSrc': '/img/menu/menu-item-1.png',
                    'rating': 52,
                    'title': 'Lorem',
                    'content': 'aisf nuaiu na iunas iuasn iasi ai unas',
                    'cost': 3000,
                    'ingredients': 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
                {
                    'id':5,
                    'imgSrc': '/img/menu/menu-item-1.png',
                    'rating': 52,
                    'title': 'Lorem',
                    'content': 'aisf nuaiu na iunas iuasn iasi ai unas',
                    'cost': 3000,
                    'ingredients': 'iunadiu daduaiudnaidund  aiudnaidun  aidun',
                },
            ]
        }
    }
}
</script>