<template>
  <section class="restaurantinfo">
    <div v-for="store in fooddata" :key="store.id">
      <h2>{{ store.name }}</h2>
      <p>
        <span style="font-weight: bold;">Delivery Time:</span>
        {{ store.deliveryTime }} Mins
      </p>
      <p>
        <span style="font-weight: bold;">Rating:</span>
        {{ store.rating }} ⭐️
      </p>
      <p v-if="store.freeDelivery" class="label">
        <span>Delivery Free</span>
      </p>

      <div class="row">
        <div v-for="menuitem in store.menu" :key="menuitem.id" class="items"
          :style="`background: url(${menuitem.img}) no-repeat center center`">
          <div class="iteminfo">
            <div>
              <h4>{{ menuitem.item }}</h4>
              <p>{{ currencyFormat(menuitem.price) }}</p>
            </div>
            <button class="ghost">View item></button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { currencyFormat } from '@/utils/helpers.js'
export default {
  computed: {
    ...mapState(['fooddata'])
  },
  methods: {
    currencyFormat
  }
}
</script>

<style lang="scss" scoped>

</style>