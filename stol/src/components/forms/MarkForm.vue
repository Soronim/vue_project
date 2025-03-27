<template>
    <div class="mark-form">
      <div v-if="userMark !== null" class="alert alert-info">
        Вы уже оценили это блюдо: {{ userMark > 0 ? '+' : '' }}{{ userMark }}
      </div>
      
      <div v-else class="card">
        <div class="card-body">
          <h5 class="card-title">Оцените блюдо</h5>
          <div class="btn-group" role="group">
            <button v-for="mark in [-3, -2, -1, 1, 2, 3]" :key="mark" 
                    @click="submitMark(mark)"
                    class="btn btn-outline-primary">
              {{ mark > 0 ? '+' : '' }}{{ mark }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import { addMark } from '@/api/marks';
  
  export default {
    props: {
      dishId: {
        type: Number,
        required: true
      },
      userMark: {
        type: Number,
        default: null
      }
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    },
    methods: {
      async submitMark(mark) {
        try {
          await addMark({
            dish_id: this.dishId,
            mark
          });
          this.$emit('mark-submitted', mark);
          this.$toast.success('Оценка сохранена');
        } catch (error) {
          this.$toast.error('Ошибка при сохранении оценки');
        }
      }
    }
  };
  </script>