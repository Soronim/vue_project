<template>
    <div class="admin-analytics">
      <div class="dish-selector">
        <select v-model="selectedDish" @change="fetchDishAnalytics">
          <option v-for="dish in dishes" :key="dish.id" :value="dish.id">
            {{ dish.title }}
          </option>
        </select>
      </div>
      
      <div class="charts">
        <div class="chart-container">
          <h3>Цены блюд</h3>
          <canvas ref="priceChart"></canvas>
        </div>
        
        <div class="chart-container">
          <h3>Средние оценки</h3>
          <canvas ref="ratingChart"></canvas>
        </div>
        
        <div v-if="selectedDish" class="dish-charts">
          <div class="chart-container">
            <h3>Оценки по выбранному блюду</h3>
            <canvas ref="dishRatingChart"></canvas>
          </div>
          
          <div class="chart-container">
            <h3>Ставки по выбранному блюду</h3>
            <canvas ref="dishBidsChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    data() {
      return {
        dishes: [],
        selectedDish: null,
        priceChart: null,
        ratingChart: null,
        dishRatingChart: null,
        dishBidsChart: null
      }
    },
    methods: {
      async fetchDishes() {
        const response = await this.$axios.get('/dishes/all');
        this.dishes = response.data.data;
        if (this.dishes.length > 0) {
          this.selectedDish = this.dishes[0].id;
        }
      },
      async fetchDishAnalytics() {
        // Загрузка данных и обновление графиков
      },
      initCharts() {
        // Инициализация всех графиков
      }
    },
    mounted() {
      this.fetchDishes();
      this.initCharts();
    }
  }
  </script>