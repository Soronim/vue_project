<template>
    <div class="bid-form">
      <div v-if="hasPendingBid" class="alert alert-warning">
        У вас есть непросмотренная ставка на это блюдо
      </div>
      
      <div v-else-if="!userMark && isLoggedIn" class="card">
        <div class="card-body">
          <h5 class="card-title">Сделать ставку</h5>
          <div class="mb-3">
            <label class="form-label">Ваша ставка (текущая цена: {{ currentPrice }} ₽)</label>
            <input type="number" v-model="bidValue" class="form-control" 
                   :min="minBid" :max="maxBid" step="10">
            <div class="form-text">
              Ставка должна отличаться от текущей цены не более чем на 20%
            </div>
          </div>
          <button @click="placeBid" class="btn btn-primary" 
                  :disabled="!isBidValid">
            Отправить ставку
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import { addBid, getUserBids } from '@/api/bids';
  
  export default {
    props: {
      dishId: {
        type: Number,
        required: true
      },
      currentPrice: {
        type: Number,
        required: true
      },
      userMark: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        bidValue: null,
        hasPendingBid: false
      };
    },
    computed: {
      ...mapGetters(['isLoggedIn']),
      minBid() {
        return Math.floor(this.currentPrice * 0.8);
      },
      maxBid() {
        return Math.ceil(this.currentPrice * 1.2);
      },
      isBidValid() {
        if (!this.bidValue) return false;
        const bid = Number(this.bidValue);
        return bid !== this.currentPrice && 
               bid >= this.minBid && 
               bid <= this.maxBid;
      }
    },
    async created() {
      if (this.isLoggedIn) {
        await this.checkPendingBids();
      }
    },
    methods: {
      async checkPendingBids() {
        try {
          const bids = await getUserBids(this.dishId);
          this.hasPendingBid = bids.some(bid => bid.status === 0);
        } catch (error) {
          console.error('Error checking bids:', error);
        }
      },
      async placeBid() {
        try {
          await addBid({
            dish_id: this.dishId,
            bid: Number(this.bidValue)
          });
          this.bidValue = null;
          this.hasPendingBid = true;
          this.$emit('bid-placed');
          this.$toast.success('Ставка отправлена на рассмотрение');
        } catch (error) {
          this.$toast.error('Ошибка при отправке ставки');
        }
      }
    }
  };
  </script>