import axios from 'axios';
export default{
    state(){
        return{
            isLogged:localStorage.getItem('is-logged'),
            token:localStorage.getItem('my-token')
        }
    },
    getters:{
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
    mutations:{
        SET_LOGGED(state,payload){
            if(payload.isLogged){
                state.isLogged=true
                state.token=payload.token
                localStorage.setItem('is-logged',true)
                localStorage.setItem('my-token',payload.token)
            }
            else{
                state.isLogged=false
                state.token=''
                localStorage.setItem('is-logged',false)
                localStorage.setItem('my-token',"")
            }
        }
    },
    actions:{
        login({commit},payload){
            return new Promise((resolve,reject)=>{
            axios.post(
                'https://webcomp.bsu.ru/sanctum/token',
                {"email":payload.login,"password":payload.password,"device_name":"Test"},
                {
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }

                }
            )
            .then(function(result){
                commit("SET_LOGGED",{isLogged:true,token:result["data"]});
                resolve(result)
            })
            .catch(function(error){
                commit("SET_LOGGED",{isLogged:false,token:''});
                reject(error)
            })
            })
        },
        logout({commit}){
            commit("SET_LOGGED",{isLogged:false,token:''})
        }
    }
}
