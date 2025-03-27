<template>
    <div class="user-cabinet">
      <h1>Личный кабинет</h1>
      
      <nav class="tabs">
        <button 
          @click="activeTab = 'comments'"
          :class="{ active: activeTab === 'comments' }"
        >
          Мои комментарии
        </button>
        <button 
          @click="activeTab = 'bids'"
          :class="{ active: activeTab === 'bids' }"
        >
          Мои ставки
        </button>
        <button 
          @click="activeTab = 'reservations'"
          :class="{ active: activeTab === 'reservations' }"
        >
          Мои заявки
        </button>
      </nav>
      
      <div class="tab-content">
        <!-- Комментарии -->
        <div v-if="activeTab === 'comments'" class="comments-section">
          <h2>Мои комментарии</h2>
          <div v-if="commentsLoading">Загрузка...</div>
          <div v-else-if="comments.length === 0">Нет комментариев</div>
          <div v-else class="comments-list">
            <div 
              v-for="comment in comments" 
              :key="comment.id"
              class="comment"
              :class="{ 'published': comment.status === 1, 'hidden': comment.status === 0 }"
            >
              <div class="comment-header">
                <span class="dish-name">{{ comment.dish_title }}</span>
                <span class="date">{{ formatDate(comment.created_at) }}</span>
              </div>
              <p class="comment-text">{{ comment.comment }}</p>
              <button 
                v-if="comment.status === 0"
                @click="deleteComment(comment.id)"
                class="delete-btn"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
        
        <!-- Ставки -->
        <div v-if="activeTab === 'bids'" class="bids-section">
          <h2>Мои ставки</h2>
          <div v-if="bidsLoading">Загрузка...</div>
          <div v-else-if="bids.length === 0">Нет ставок</div>
          <div v-else class="bids-list">
            <div 
              v-for="bid in bids" 
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
                <span>Цена: {{ bid.bid }} ₽</span>
                <span class="date">{{ formatDate(bid.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Заявки -->
        <div v-if="activeTab === 'reservations'" class="reservations-section">
          <h2>Мои заявки</h2>
          <div v-if="reservationsLoading">Загрузка...</div>
          <div v-else-if="reservations.length === 0">Нет заявок</div>
          <div v-else class="reservations-list">
            <div 
              v-for="reservation in reservations" 
              :key="reservation.id"
              class="reservation"
              :class="{ 
                'confirmed': reservation.status === 1, 
                'rejected': reservation.status === 2,
                'pending': reservation.status === 0
              }"
            >
              <div class="reservation-header">
                <span class="date">{{ formatDate(reservation.reservation_date) }}</span>
                <span class="status">{{ getReservationStatusText(reservation.status) }}</span>
              </div>
              <div class="reservation-details">
                <span>Гостей: {{ reservation.guests }}</span>
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
        </div>
      </div>
      
      <button @click="logout" class="logout-btn">Выйти</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserCabinet',
    data() {
      return {
        activeTab: 'comments',
        comments: [],
        commentsLoading: false,
        bids: [],
        bidsLoading: false,
        reservations: [],
        reservationsLoading: false
      }
    },
    methods: {
      async fetchComments() {
        this.commentsLoading = true;
        try {
          const response = await axios.get('https://webcomp.bsu.ru/api/finals25/fullcomments', {
            headers: {
              'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
            }
          });
          this.comments = response.data.data;
        } catch (error) {
          console.error('Error fetching comments:', error);
        } finally {
          this.commentsLoading = false;
        }
      },
      async fetchBids() {
        this.bidsLoading = true;
        try {
          const response = await axios.get('https://webcomp.bsu.ru/api/finals25/dishes/allbids', {
            headers: {
              'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
            }
          });
          this.bids = response.data.data;
        } catch (error) {
          console.error('Error fetching bids:', error);
        } finally {
          this.bidsLoading = false;
        }
      },
      async fetchReservations() {
        this.reservationsLoading = true;
        try {
          const response = await axios.get('https://webcomp.bsu.ru/api/finals25/reservation/all', {
            headers: {
              'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
            }
          });
          this.reservations = response.data.data;
        } catch (error) {
          console.error('Error fetching reservations:', error);
        } finally {
          this.reservationsLoading = false;
        }
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleString();
      },
      getBidStatusText(status) {
        switch(status) {
          case 0: return 'Новая';
          case 1: return 'Подтверждена';
          case 2: return 'Отклонена';
          default: return 'Неизвестно';
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
      async deleteComment(commentId) {
        if (confirm('Удалить комментарий?')) {
          try {
            await axios.get(`https://webcomp.bsu.ru/api/finals25/deletecomment/${commentId}`, {
              headers: {
                'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
              }
            });
            this.comments = this.comments.filter(c => c.id !== commentId);
          } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Не удалось удалить комментарий');
          }
        }
      },
      async cancelReservation(reservationId) {
        if (confirm('Отменить заявку?')) {
          try {
            await axios.put('https://webcomp.bsu.ru/api/finals25/reservation/authorized/setstatus', 
              { reservation_id: reservationId, status: 3 },
              {
                headers: {
                  'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
                }
              }
            );
            await this.fetchReservations();
          } catch (error) {
            console.error('Error canceling reservation:', error);
            alert('Не удалось отменить заявку');
          }
        }
      },
      logout() {
        this.$store.dispatch('loginInfo/logout');
        this.$router.push({ name: 'mainPage' });
      }
    },
    created() {
      this.fetchComments();
      this.fetchBids();
      this.fetchReservations();
    }
  }
  </script>
  
  <style scoped>
  .user-cabinet {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  
  .tabs button {
    padding: 10px 20px;
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }
  
  .tabs button.active {
    border-bottom: 2px solid #42b983;
    font-weight: bold;
  }
  
  .comments-list, .bids-list, .reservations-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .comment, .bid, .reservation {
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .comment-header, .bid-header, .reservation-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .comment.published {
    background-color: #f0f8ff;
  }
  
  .comment.hidden {
    background-color: #fff0f0;
    opacity: 0.8;
  }
  
  .bid.confirmed {
    background-color: #f0fff0;
  }
  
  .bid.rejected {
    background-color: #fff0f0;
  }
  
  .bid.new {
    background-color: #fffff0;
  }
  
  .reservation.confirmed {
    background-color: #f0fff0;
  }
  
  .reservation.rejected {
    background-color: #fff0f0;
  }
  
  .reservation.pending {
    background-color: #fffff0;
  }
  
  .delete-btn, .cancel-btn {
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .logout-btn {
    margin-top: 20px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>