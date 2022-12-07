<template>
  <div class="container restaurant">
    <div class="restaurantheading">
      <h1>Restaurants</h1>
      <AppSelect @change="(selectedRestaurant = $event)" :selectOptions="restaurantNames" select="restaurant" />
    </div>
    <AppRestaurantInfo :datasource="restaurantFiltered" />
  </div>
</template>

<script>
import AppRestaurantInfo from '@/components/AppRestaurantInfo.vue';
import AppSelect from '@/components/AppSelect.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AppSelect,
    AppRestaurantInfo
  },
  data() {
    return {
      selectedRestaurant: ''
    }
  },
  computed: {
    ...mapState(['fooddata']),
    restaurantNames() {
      return this.fooddata.map(store => store.name)
    },
    restaurantFiltered() {
      if (!this.selectedRestaurant) return this.fooddata
      return this.fooddata.filter(store => store.name === this.selectedRestaurant)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>