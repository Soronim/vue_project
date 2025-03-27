<template>
    <div class="admin-bids">
      <div class="filters">
        <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Все</button>
        <button @click="filter = 'new'" :class="{ active: filter === 'new' }">Новые</button>
        <button @click="filter = 'confirmed'" :class="{ active: filter === 'confirmed' }">Подтверждённые</button>
        <button @click="filter = 'rejected'" :class="{ active: filter === 'rejected' }">Отклонённые</button>
      </div>
      
      <div class="bids-list">
        <div v-for="bid in filteredBids" :key="bid.id" class="bid-item">
          <div class="bid-info">
            <span class="user">{{ bid.user_name }}</span>
            <span class="dish">Блюдо: {{ bid.dish_title }}</span>
            <span class="price">Текущая цена: {{ bid.current_price }} ₽</span>
            <span class="bid">Ставка: {{ bid.bid }} ₽</span>
          </div>
          <div class="bid-actions" v-if="bid.status === 0">
            <button @click="approveBid(bid.id)" class="approve-btn">Подтвердить</button>
            <button @click="rejectBid(bid.id)" class="reject-btn">Отклонить</button>
          </div>
          <div class="bid-status" v-else>
            Статус: {{ bid.status === 1 ? 'Подтверждена' : 'Отклонена' }}
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