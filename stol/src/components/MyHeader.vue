<template>
    <header id="header" class="header d-flex align-items-center sticky-top">
        <div class="container position-relative d-flex align-items-center justify-content-between">

            <a href="index.html" class="logo d-flex align-items-center me-auto me-xl-0">
                <!-- Uncomment the line below if you also wish to use an image logo -->
                <img src="/img/logo.png" alt="logo"> 
                <h1 class="sitename">БГУ</h1>
                <span>.</span>
            </a>

            <nav id="navmenu" class="navmenu">
                <ul>
                <li><a href="#hero" class="active">Главная<br></a></li>
                <li><a href="#about">О нас</a></li>
                <li><a href="#menu">Меню</a></li>                    
                
                <li class="dropdown"><a href="#"><span>Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                    <li><a href="#">Dropdown 1</a></li>
                    <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                        <li><a href="#">Deep Dropdown 1</a></li>
                        <li><a href="#">Deep Dropdown 2</a></li>
                        <li><a href="#">Deep Dropdown 3</a></li>
                        <li><a href="#">Deep Dropdown 4</a></li>
                        <li><a href="#">Deep Dropdown 5</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Dropdown 2</a></li>
                    <li><a href="#">Dropdown 3</a></li>
                    <li><a href="#">Dropdown 4</a></li>
                    </ul>
                </li>
                <li><a href="#contact">Contact</a></li>
                </ul>
                <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            <div class="text-end">
                <button type="button" class="btn-getstarted" @click="loginButtonHandler()">
                    {{is_logged?'Выйти':'Войти'}}
                </button>
            </div>
        </div>
    </header>
</template>

<script>
export default{
    name:"MyHeader",
    data(){
        return{
            menuItems:[

            ]
        }
    },
    compited:{
        is_logged(){
            return this.$store.getters.getLogged
        }
    },
    methods:{
        loginButtonHandler(){
            if(this.is_logged){
                this.$store.dispatch('logout')
                .then(()=>this.$router.push({path:'/'}))
            }
            else{
                this.$router.push('/login')
            }
        }
    }
}
</script>