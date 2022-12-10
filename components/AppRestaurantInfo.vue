<template>
  <section class="restaurantinfo">
    <fieldset v-for="store in datasource" :key="store.id">
      <legend>
        <h2>{{ store.name }}</h2>
      </legend>
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
              <p>{{ priceFormatting(menuitem.price) }}</p>
            </div>
            <nuxt-link :to="`/products/${menuitem.id}`">
              <button class="ghost">View item</button>
            </nuxt-link>
          </div>
        </div>
      </div>

    </fieldset>
  </section>
</template>

<script>
export default {
  props: {
    datasource: {
      type: [Array, Object]
    }
  },
  methods: {
    priceFormatting(price) {
      return `$ ${price.toFixed(2)}`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>