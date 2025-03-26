import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

//Подключаю CSS
import './assets/vendor/bootstrap/css/bootstrap-grid.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'

import '@/assets/vendor/bootstrap-icons/bootstrap-icons.css'
import '@/assets/vendor/glightbox/css/glightbox.min.css'
import '@/assets/vendor/swiper/swiper-bundle.min.css'
import '@/assets/css/main.css'

createApp(App).use(router).use(store).mount('#app')
