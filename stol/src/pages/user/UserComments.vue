<template>
  <UserHeader></UserHeader>
  <div class="user-comments">
    <h1>Мои комментарии</h1>
    
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Все</button>
      <button @click="filter = 'published'" :class="{ active: filter === 'published' }">Опубликованные</button>
      <button @click="filter = 'hidden'" :class="{ active: filter === 'hidden' }">Скрытые</button>
    </div>
    
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="filteredComments.length === 0" class="empty">Нет комментариев</div>
    <div v-else class="comments-list">
      <div 
        v-for="comment in filteredComments" 
        :key="comment.id"
        class="comment"
        :class="{ 'published': comment.status === 1, 'hidden': comment.status === 0 }"
      >
        <div class="comment-header">
          <span class="dish-name">{{ comment.dish_title }}</span>
          <span class="date">{{ formatDate(comment.created_at) }}</span>
        </div>
        <p class="comment-text">{{ comment.comment }}</p>
        <div class="comment-actions">
          <button 
            v-if="comment.status === 0"
            @click="deleteComment(comment.id)"
            class="delete-btn"
          >
            Удалить
          </button>
          <router-link 
            v-if="comment.dish_id"
            :to="`/dish/${comment.dish_id}`"
            class="view-dish-btn"
          >
            Посмотреть блюдо
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from '@/components/user/UserHeader.vue';
import axios from 'axios'

export default {
  name:'UserComments',
  components:{
    UserHeader
  },
  data() {
    return {
      comments: [],
      loading: false,
      filter: 'all'
    }
  },
  computed: {
    filteredComments() {
      switch(this.filter) {
        case 'published': return this.comments.filter(c => c.status === 1);
        case 'hidden': return this.comments.filter(c => c.status === 0);
        default: return this.comments;
      }
    }
  },
  methods: {
    async fetchComments() {
      this.loading = true;
      try {
        console.log('Fetching comments with token:', this.$store.getters['loginInfo/getToken']);
        
        const response = await axios.get('https://webcomp.bsu.ru/api/finals25/fullcomments', {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}`
          }
        });
        
        console.log('API response:', response);
        this.comments = response.data.data;
      } catch (error) {
        console.error('Error details:', error.response || error);
        this.$toast.error('Ошибка загрузки комментариев');
      } finally {
        this.loading = false;
      }
    },
    async deleteComment(commentId) {
      if (confirm('Удалить комментарий?')) {
        try {
          await this.$axios.get(`/deletecomment/${commentId}`, {
            headers: { 'Authorization': `Bearer ${this.$store.getters['loginInfo/getToken']}` }
          });
          this.comments = this.comments.filter(c => c.id !== commentId);
        } catch (error) {
          console.error('Error deleting comment:', error);
          this.$toast.error('Не удалось удалить комментарий');
        }
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    }
  },
  created() {
    this.fetchComments();
  }
}
</script>

<style>
.comment {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.comment.published {
  background-color: #f0f8ff;
  border-left: 4px solid #42b983;
}

.comment.hidden {
  background-color: #fff0f0;
  border-left: 4px solid #ff6b6b;
  opacity: 0.8;
}

.comment-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.view-dish-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
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
</style>