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
  
  <style scoped>
  .auth-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
  }
  
  .auth-form {
    width: 100%;
    max-width: 420px;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .logo-container {
    text-align: center;
    margin-bottom: 24px;
  }
  
  .logo-img {
    width: 80px;
    height: auto;
  }
  
  .auth-title {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 32px;
    color: #2c3e50;
  }
  
  .form-group {
    position: relative;
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #495057;
    font-weight: 500;
  }
  
  .form-input {
    width: 100%;
    padding: 12px 16px 12px 40px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
  }
  
  .form-input:focus {
    border-color: #4285f4;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
    outline: none;
  }
  
  .input-icon {
    position: absolute;
    left: 12px;
    top: 38px;
    color: #6c757d;
    font-size: 18px;
  }
  
  .password-toggle {
    position: absolute;
    right: 12px;
    top: 38px;
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    font-size: 18px;
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
  }
  
  .remember-me input {
    margin-right: 8px;
  }
  
  .forgot-password {
    color: #4285f4;
    text-decoration: none;
    font-size: 0.9rem;
  }
  
  .forgot-password:hover {
    text-decoration: underline;
  }
  
  .auth-button {
    width: 100%;
    padding: 12px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 24px;
  }
  
  .auth-button:hover {
    background-color: #3367d6;
  }
  
  .auth-button:disabled {
    background-color: #a0bff8;
    cursor: not-allowed;
  }
  
  .auth-footer {
    text-align: center;
    font-size: 0.9rem;
    color: #6c757d;
  }
  
  .register-link {
    color: #4285f4;
    text-decoration: none;
  }
  
  .register-link:hover {
    text-decoration: underline;
  }
  
  .copyright {
    margin-top: 16px;
  }
  
  .copyright strong {
    color: #2c3e50;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 576px) {
    .auth-form {
      padding: 30px 20px;
    }
  }
  </style>