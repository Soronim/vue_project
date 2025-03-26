<template>
    <div v-if="uploaded && errors == ''" class="alert alert-success" role="alert">
        Данные успешно загружены
    </div>
    <div v-else-if="uploaded" class="alert alert-danger" role="alert">
        При загрузке обнаружены ошибки: {{ errors }}
    </div>
    <div class="card">
        <div class="card-body">
            <form>
                <label for="user_name">Ваше имя</label>
                <input id="user_name" class="form-control mt-1" placeholder="Ваше имя" required
                    v-model="localUserInfo.user_name" />
                <label for="description">О вас</label>
                <textarea id="description" class="form-control mt-1" placeholder="О вас"
                    v-model="localUserInfo.description"></textarea>
                <label for="team_name">Название команды</label>
                <input id="team_name" class="form-control mt-1" placeholder="Название команды" required
                    v-model="localUserInfo.team_name" />
                <label for="track">Трек</label>
                <select id="track" class="form-control mt-1" v-model="localUserInfo.track_id">
                    <option v-for="(item, index) in tracks" :key="index" :value="item.track_id">
                        {{ item.title }}
                    </option>
                </select><br>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserDataForm',
    props: {
        userInfo: {
            type: Object,
            default: () => ({
                track_id: 1,
                user_name: 'no',
                description: 'no',
                team_name: 'no',
            }),
        },
    },
    data() {
        return {
            uploaded: false,
            errors: '',
            tracks: [
                { title: 'HTML - вёрстка', track_id: 1 },
                { title: 'Фронтенд разработка на Vue.js', track_id: 2 },
            ],
            localUserInfo: { ...this.userInfo },
        };
    },
    methods: {
        fetchUserData() {
            axios.get('https://webcomp.bsu.ru/api/userData', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.my_token,
                },
            })
            .then((response) => {
                const data = response.data.data;
                
                this.localUserInfo = {
                    user_name: data.user_name,
                    team_name: data.team_name,
                    description: data.description,
                    track_id: data.track_id,
                };
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных пользователя:', error);
            });
        },
    },
    computed: {
        my_token() {
            return this.$store.getters.getToken;
        },
    },
    mounted() {
        this.fetchUserData();
    },
};
</script>