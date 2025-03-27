<template>
    <div class="comments-section">
      <div v-if="isLoggedIn" class="comment-form mb-4">
        <textarea v-model="newComment" class="form-control" placeholder="Оставьте комментарий"></textarea>
        <button @click="addComment" class="btn btn-primary mt-2" :disabled="!newComment.trim()">
          Отправить
        </button>
      </div>
  
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" 
             class="comment mb-3 p-3 rounded"
             :class="{
               'bg-light': comment.status === 0,
               'user-comment': isUserComment(comment.user_id),
               'unpublished': comment.status === 0 && isModerator
             }">
          <div class="comment-header d-flex justify-content-between mb-2">
            <strong>{{ comment.user_name }}</strong>
            <span class="text-muted">{{ formatDate(comment.created_at) }}</span>
          </div>
          <p class="comment-text">{{ comment.comment }}</p>
          
          <div v-if="isModerator || (isUserComment(comment.user_id) && comment.status === 0)" 
               class="comment-actions">
            <button v-if="isModerator" @click="toggleCommentStatus(comment.id)" 
                    class="btn btn-sm btn-outline-secondary me-2">
              <i class="bi bi-eye" v-if="comment.status === 1"></i>
              <i class="bi bi-eye-slash" v-else></i>
            </button>
            <button @click="deleteComment(comment.id)" 
                    class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import { addComment, toggleCommentStatus, deleteComment } from '@/api/comments';
  
  export default {
    props: {
      dishId: {
        type: Number,
        required: true
      },
      comments: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        newComment: ''
      };
    },
    computed: {
      ...mapGetters(['isLoggedIn', 'isModerator', 'userId'])
    },
    methods: {
      isUserComment(commentUserId) {
        return this.userId === commentUserId;
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleString();
      },
      async addComment() {
        try {
          await addComment({
            dish_id: this.dishId,
            comment: this.newComment
          });
          this.newComment = '';
          this.$emit('refresh-comments');
          this.$toast.success('Комментарий добавлен');
        } catch (error) {
          this.$toast.error('Ошибка при добавлении комментария');
        }
      },
      async toggleCommentStatus(commentId) {
        try {
          await toggleCommentStatus(commentId);
          this.$emit('refresh-comments');
          this.$toast.success('Статус комментария изменён');
        } catch (error) {
          this.$toast.error('Ошибка при изменении статуса');
        }
      },
      async deleteComment(commentId) {
        try {
          await deleteComment(commentId);
          this.$emit('refresh-comments');
          this.$toast.success('Комментарий удалён');
        } catch (error) {
          this.$toast.error('Ошибка при удалении комментария');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .user-comment {
    border-left: 3px solid #0d6efd;
    background-color: rgba(13, 110, 253, 0.05);
  }
  .unpublished {
    background-color: rgba(255, 193, 7, 0.1);
  }
  .comment-actions {
    border-top: 1px solid #eee;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
  </style>