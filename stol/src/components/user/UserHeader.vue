<template>
    <nav class="tabs">
      <router-link 
        :to="{ name: 'userComments' }" 
        class="tab-link"
        active-class="active"
      >
        Мои комментарии
      </router-link>
      <router-link 
        :to="{ name: 'userBids' }" 
        class="tab-link"
        active-class="active"
      >
        Мои ставки
      </router-link>
      <router-link 
        :to="{ name: 'userReservations' }" 
        class="tab-link"
        active-class="active"
      >
        Мои заявки
      </router-link>
    </nav>
</template>

<script>
export default {
    name: "MyHeader",
}
</script>

<style scoped>
.user-cabinet {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.tab-link {
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  border-bottom: 2px solid transparent;
}

.tab-link.active {
  border-bottom: 2px solid #42b983;
  font-weight: bold;
}

.logout-btn {
  margin-top: 30px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>