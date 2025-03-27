import axios from 'axios';

export default {
    namespaced: true, // Добавляем namespaced
    
    state() {
        return {
            isLogged: localStorage.getItem('is-logged'),
            token: localStorage.getItem('my-token')
        }
    },
    getters: {
        getLogged(state){
            let logged=true
            if(state.isLogged=="false"||!state.isLogged){
                logged=false
            }
            return logged;
        },
        getToken(state){
            return state.token
        },
    },
    mutations: {
        SET_LOGGED(state, payload) {
            state.isLogged = payload
            state.token = payload.token || '';
            
            if (payload.isLogged) {
                localStorage.setItem('is-logged', 'true');
                localStorage.setItem('my-token', payload.token);
            } else {
                localStorage.setItem('is-logged', 'false');
                localStorage.setItem('my-token', '');
            }
        }
    },
    actions: {
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post(
                    'https://webcomp.bsu.ru/sanctum/token',
                    {
                        email: payload.login,
                        password: payload.password,
                        device_name: "web"
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(response => {
                    commit("SET_LOGGED", {
                        isLogged: true,
                        token: response.data
                    });
                    resolve(response.data); 
                })
                .catch(error => {
                    commit("SET_LOGGED", {
                        isLogged: false,
                        token: ''
                    });
                    reject(error);
                });
            });
        },
        logout({ commit }) {
            commit("SET_LOGGED", {
                isLogged: false,
                token: ''
            });
        }
    }
}