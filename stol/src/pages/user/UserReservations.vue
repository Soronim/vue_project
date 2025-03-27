<template>
  <UserHeader></UserHeader>
  <div class="user-reservations">
    <h1>Мои заявки</h1>
    
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Все</button>
      <button @click="filter = 'confirmed'" :class="{ active: filter === 'confirmed' }">Подтверждённые</button>
      <button @click="filter = 'pending'" :class="{ active: filter === 'pending' }">В рассмотрении</button>
      <button @click="filter = 'rejected'" :class="{ active: filter === 'rejected' }">Отклонённые</button>
      <button @click="filter = 'upcoming'" :class="{ active: filter === 'upcoming' }">Ближайшие</button>
    </div>
    
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="filteredReservations.length === 0" class="empty">Нет заявок</div>
    <div v-else class="reservations-list">
      <div 
        v-for="reservation in filteredReservations" 
        :key="reservation.id"
        class="reservation"
        :class="{ 
          'confirmed': reservation.status === 1, 
          'rejected': reservation.status === 2,
          'pending': reservation.status === 0,
          'cancelled': reservation.status === 3
        }"
      >
        <div class="reservation-header">
          <span class="date">{{ formatDate(reservation.reservation_date) }}</span>
          <span class="status">{{ getReservationStatusText(reservation.status) }}</span>
        </div>
        <div class="reservation-details">
          <span>Гостей: {{ reservation.guests }}</span>
          <span>Телефон: {{ reservation.phone }}</span>
          <button 
            v-if="canCancelReservation(reservation)"
            @click="cancelReservation(reservation.id)"
            class="cancel-btn"
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
    
    <div class="stats">
      <div class="stat-card">
        <h3>Подтверждённые на сегодня</h3>
        <p>{{ confirmedTodayCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from '@/components/user/UserHeader.vue';

export default {
  name:'UserReservations',
  components:{
    UserHeader
  },
  data() {
    return {
      reservations: [],
      loading: false,
      filter: 'all'
    }
  },
  computed: {
    filteredReservations() {
      const now = new Date();
      switch(this.filter) {
        case 'confirmed': return this.reservations.filter(r => r.status === 1);
        case 'pending': return this.reservations.filter(r => r.status === 0);
        case 'rejected': return this.reservations.filter(r => r.status === 2);
        case 'upcoming': 
          return this.reservations.filter(r => {
            const resDate = new Date(r.reservation_date);
            return resDate > now && (r.status === 0 || r.status === 1);
          });
        default: return this.reservations;
      }
    },
    confirmedTodayCount() {
      const today = new Date().toISOString().split('T')[0];
      return this.reservations.filter(r => {
        const resDate = r.reservation_date.split(' ')[0];
        return resDate === today && r.status === 1;
      }).length;
    }
  },
  methods: {
    async fetchReservations() {
      this.loading = true;
      try {
        const response = await this.$axios.get('/reservation/all', {
          headers: { 'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}` }
        });
        this.reservations = response.data.data;
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        this.loading = false;
      }
    },
    getReservationStatusText(status) {
      switch(status) {
        case 0: return 'В рассмотрении';
        case 1: return 'Подтверждена';
        case 2: return 'Отклонена';
        case 3: return 'Отменена';
        default: return 'Неизвестно';
      }
    },
    canCancelReservation(reservation) {
      if (reservation.status !== 0 && reservation.status !== 1) return false;
      
      const reservationDate = new Date(reservation.reservation_date);
      const now = new Date();
      const hoursDiff = (reservationDate - now) / (1000 * 60 * 60);
      
      return hoursDiff > 5;
    },
    async cancelReservation(reservationId) {
      if (confirm('Отменить заявку?')) {
        try {
          await this.$axios.put('/reservation/authorized/setstatus', 
            { reservation_id: reservationId, status: 3 },
            { headers: { 'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}` } }
          );
          await this.fetchReservations();
          this.$toast.success('Заявка успешно отменена');
        } catch (error) {
          console.error('Error canceling reservation:', error);
          this.$toast.error('Не удалось отменить заявку');
        }
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    }
  },
  created() {
    this.fetchReservations();
  }
}
</script>

<style scoped>
.reservation {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.reservation.confirmed {
  background-color: #f0fff0;
  border-left: 4px solid #42b983;
}

.reservation.rejected {
  background-color: #fff0f0;
  border-left: 4px solid #ff6b6b;
}

.reservation.pending {
  background-color: #fffff0;
  border-left: 4px solid #ffcc00;
}

.reservation.cancelled {
  background-color: #f8f8f8;
  border-left: 4px solid #999;
  opacity: 0.7;
}

.reservation-details {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.cancel-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
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

.stats {
  margin-top: 30px;
}

.stat-card {
  padding: 15px;
  border-radius: 5px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  max-width: 300px;
}

.stat-card h3 {
  margin-top: 0;
  color: #666;
}

.stat-card p {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0;
}
</style>