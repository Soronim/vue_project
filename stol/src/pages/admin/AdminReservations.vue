<template>
    <div v-if="activeTab === 'reservations'" class="reservations-section">
          <h2>Заявки на столики</h2>
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
                <span class="user">{{ reservation.user_info || reservation.email }}</span>
                <span class="status">{{ getReservationStatusText(reservation.status) }}</span>
              </div>
              <div class="reservation-details">
                <span>Дата: {{ formatDate(reservation.reservation_date) }}</span>
                <span>Гостей: {{ reservation.guests }}</span>
                <span>Телефон: {{ reservation.phone }}</span>
              </div>
              <div v-if="reservation.status === 0 || reservation.status === 1" class="reservation-actions">
                <button 
                  @click="changeReservationStatus(reservation.id, 1)"
                  class="confirm-btn"
                  :disabled="reservation.status === 1"
                >
                  Подтвердить
                </button>
                <button 
                  @click="changeReservationStatus(reservation.id, 2)"
                  class="reject-btn"
                  :disabled="reservation.status === 2"
                >
                  Отклонить
                </button>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    name: 'AdminCabinet',
    data() {
      return {
        activeTab: 'comments',
        comments: [],
        commentsLoading: false,
        commentsFilter: 'all',
        bids: [],
        bidsLoading: false,
        bidsFilter: 'all',
        reservations: [],
        reservationsLoading: false
      }
    },
    computed: {
      filteredComments() {
        return this.comments.filter(comment => {
          if (this.commentsFilter === 'all') return true;
          if (this.commentsFilter === 'visible') return comment.status === 1;
          if (this.commentsFilter === 'hidden') return comment.status === 0;
          return true;
        });
      },
      filteredBids() {
        return this.bids.filter(bid => {
          if (this.bidsFilter === 'all') return true;
          if (this.bidsFilter === 'new') return bid.status === 0;
          if (this.bidsFilter === 'confirmed') return bid.status === 1;
          if (this.bidsFilter === 'rejected') return bid.status === 2;
          return true;
        });
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
      async toggleCommentStatus(comment) {
        try {
          await axios.get(`https://webcomp.bsu.ru/api/finals25/changecommentstatus/${comment.id}`, {
            headers: {
              'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
            }
          });
          comment.status = comment.status === 1 ? 0 : 1;
        } catch (error) {
          console.error('Error toggling comment status:', error);
          alert('Не удалось изменить статус комментария');
        }
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
      async changeBidStatus(bidId, status) {
        try {
          await axios.put('https://webcomp.bsu.ru/api/finals25/dishes/changebidstatus', 
            { bid_id: bidId, status: status },
            {
              headers: {
                'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
              }
            }
          );
          await this.fetchBids();
        } catch (error) {
          console.error('Error changing bid status:', error);
          alert('Не удалось изменить статус ставки');
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