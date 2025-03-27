<template>
    <div class="auth-wrapper">
      <form class="auth-form" @submit.prevent="$emit('sendData')">
        <div class="logo-container">
          <router-link to="/">
            <img src="/img/logo.png" alt="Логотип БГУ" class="logo-img">
          </router-link>
        </div>
        
        <h1 class="auth-title">Вход в личный кабинет</h1>
        
        <div class="form-group">
          <label for="inputEmail" class="form-label">Электронная почта</label>
          <input 
            type="email" 
            id="inputEmail" 
            class="form-input"
            placeholder="example@bsu.by"
            :value="login" 
            @input="$emit('update:login', $event.target.value)"
            required
            autofocus
          >
          <span class="input-icon">
            <i class="bi bi-envelope"></i>
          </span>
        </div>
        
        <div class="form-group">
          <label for="inputPassword" class="form-label">Пароль</label>
          <input 
            type="password" 
            id="inputPassword" 
            class="form-input"
            placeholder="Введите пароль"
            :value="password"
            @input="$emit('update:password', $event.target.value)"
            required
          >
          <span class="input-icon">
            <i class="bi bi-lock"></i>
          </span>
          <button type="button" class="password-toggle" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
        
        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="rememberMe" v-model="rememberMe">
            <label for="rememberMe">Запомнить меня</label>
          </div>
          <router-link to="/forgot-password" class="forgot-password">Забыли пароль?</router-link>
        </div>
        
        <button class="auth-button" type="submit" :disabled="isLoading">
          <span v-if="!isLoading">Войти</span>
          <div v-else class="spinner"></div>
        </button>
        
        
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginForm",
    props: ['login', 'password'],
    emits: ['update:login', 'update:password', 'sendData']
  }
  </script>
  
  