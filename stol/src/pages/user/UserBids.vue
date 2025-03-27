<template>
  <UserHeader></UserHeader>
  <div class="user-bids">
    <h1>Мои ставки</h1>
    
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Все</button>
      <button @click="filter = 'confirmed'" :class="{ active: filter === 'confirmed' }">Подтверждённые</button>
      <button @click="filter = 'rejected'" :class="{ active: filter === 'rejected' }">Отклонённые</button>
      <button @click="filter = 'new'" :class="{ active: filter === 'new' }">Новые</button>
    </div>
    
    <div class="sorting">
      <span>Сортировка:</span>
      <select v-model="sortBy" @change="sortBids">
        <option value="price_asc">По цене (возрастание)</option>
        <option value="price_desc">По цене (убывание)</option>
        <option value="date_asc">По дате (старые)</option>
        <option value="date_desc">По дате (новые)</option>
      </select>
    </div>
    
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="filteredBids.length === 0" class="empty">Нет ставок</div>
    <div v-else class="bids-list">
      <div 
        v-for="bid in sortedBids" 
        :key="bid.id"
        class="bid"
        :class="{ 
          'confirmed': bid.status === 1, 
          'rejected': bid.status === 2,
          'new': bid.status === 0
        }"
      >
        <div class="bid-header">
          <span class="dish-name">{{ bid.dish_title }}</span>
          <span class="status">{{ getBidStatusText(bid.status) }}</span>
        </div>
        <div class="bid-details">
          <span>Текущая цена: {{ bid.current_price }} ₽</span>
          <span>Ваша ставка: {{ bid.bid }} ₽</span>
          <span class="date">{{ formatDate(bid.created_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from '@/components/user/UserHeader.vue';

export default {
  name:'UserBids',
  components:{
    UserHeader
  },
  data() {
    return {
      bids: [],
      loading: false,
      filter: 'all',
      sortBy: 'date_desc',
      sortDirection: 'desc'
    }
  },
  computed: {
    filteredBids() {
      switch(this.filter) {
        case 'confirmed': return this.bids.filter(b => b.status === 1);
        case 'rejected': return this.bids.filter(b => b.status === 2);
        case 'new': return this.bids.filter(b => b.status === 0);
        default: return this.bids;
      }
    },
    sortedBids() {
      const [field, direction] = this.sortBy.split('_');
      return [...this.filteredBids].sort((a, b) => {
        if (field === 'price') {
          return direction === 'asc' ? a.bid - b.bid : b.bid - a.bid;
        } else {
          return direction === 'asc' 
            ? new Date(a.created_at) - new Date(b.created_at)
            : new Date(b.created_at) - new Date(a.created_at);
        }
      });
    }
  },
  methods: {
    async fetchBids() {
      this.loading = true;
      try {
        const response = await this.$axios.get('/dishes/allbids', {
          headers: { 'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}` }
        });
        this.bids = response.data.data;
      } catch (error) {
        console.error('Error fetching bids:', error);
      } finally {
        this.loading = false;
      }
    },
    getBidStatusText(status) {
      switch(status) {
        case 0: return 'Новая';
        case 1: return 'Подтверждена';
        case 2: return 'Отклонена';
        default: return 'Неизвестно';
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    sortBids() {
      // Сортировка выполняется в computed свойстве sortedBids
    }
  },
  created() {
    this.fetchBids();
  }
}
</script>

<style scoped>
.bid {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.bid.confirmed {
  background-color: #f0fff0;
  border-left: 4px solid #42b983;
}

.bid.rejected {
  background-color: #fff0f0;
  border-left: 4px solid #ff6b6b;
}

.bid.new {
  background-color: #fffff0;
  border-left: 4px solid #ffcc00;
}

.bid-details {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.filters {
  margin-bottom: 20px;
}

.filters button {
  margin-right: 10px;
  padding: 5px 15px;
  border: 1px solid #ddd;
  background: none;
  cursor: pointer;
}

.filters button.active {
  background-color: #42b983;
  color: white;
}

.sorting {
  margin-bottom: 20px;
}

.sorting select {
  margin-left: 10px;
  padding: 5px;
}
</style>