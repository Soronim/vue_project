<template>
    <div class="admin-comments">
      <div class="filters">
        <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Все</button>
        <button @click="filter = 'visible'" :class="{ active: filter === 'visible' }">Видимые</button>
        <button @click="filter = 'hidden'" :class="{ active: filter === 'hidden' }">Скрытые</button>
      </div>
      
      <div class="comments-list">
        <div v-for="comment in filteredComments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <span class="user">{{ comment.user_name }}</span>
            <span class="dish">Блюдо: {{ comment.dish_title }}</span>
            <span class="date">{{ formatDate(comment.created_at) }}</span>
          </div>
          <p class="comment-text">{{ comment.comment }}</p>
          <div class="comment-actions">
            <button @click="toggleCommentVisibility(comment.id)" class="toggle-btn">
              {{ comment.status === 1 ? 'Скрыть' : 'Показать' }}
            </button>
            <button @click="deleteComment(comment.id)" class="delete-btn">
              Удалить
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