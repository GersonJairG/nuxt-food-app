<template>
  <main class="container">
    <section class="image" :style="`background: url(/${currentItem.img}) no-repeat center center;`" />

    <section class="details">
      <h1>{{ currentItem.item }}</h1>

      <h3>Price: ${{ currentItem.price.toFixed(2) }}</h3>

      <div class="quantity">
        <input type="number" min="1" v-model="count">
        <button @click="addToCart" class="primary">Add to Cart - ${{ combinedPrice }}</button>
      </div>

      <fieldset v-if="currentItem.options">
        <legend>Options</legend>
        <div v-for="option in currentItem.options" :key="option">
          <input type="radio" name="option" :id="option" :value="option" v-model="$v.itemOptions.$model"
            @change="errors = false">
          <label for="option">{{ option }}</label>
        </div>
      </fieldset>

      <fieldset v-if="currentItem.addOns">
        <legend>Add ons</legend>
        <div v-for="addOn in currentItem.addOns" :key="addOn">
          <input type="checkbox" name="addOn" :id="addOn" :value="addOn" v-model="$v.itemAddons.$model"
            @change="errors = false">
          <label for="addOn">{{ addOn }}</label>
        </div>
      </fieldset>

      <AppToast :show="errors" :closeAlert="() => (errors = false)">
        Please select <span v-if="currentItem.options">options and</span> addons before continuing
      </AppToast>

      <AppToast :show="cartSubmitted" :closeAlert="() => (cartSubmitted = false)" theme="success">
        Order submitted! Check out more <nuxt-link to="/restaurants">restaurants</nuxt-link>!
      </AppToast>

    </section>

    <section class="options">
      <h3>Description</h3>
      <p>{{ currentItem.description }}</p>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import AppToast from '@/components/AppToast'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    AppToast
  },
  data() {
    return {
      id: this.$route.params.id,
      count: 1,
      itemOptions: "",
      itemAddons: [],
      itemSizeAndCost: [],
      cartSubmitted: false,
      errors: false
    }
  },
  validations: {
    itemOptions: {
      required,
    },
    itemAddons: {
      required
    }
  },
  computed: {
    ...mapState(['fooddata']),
    currentItem() {
      for (const store of this.fooddata) {
        for (const menu of store.menu) {
          if (menu.id === this.id) return menu
        }
      }
    },
    combinedPrice() {
      return (this.count * this.currentItem.price).toFixed(2)
    }
  },
  methods: {
    addToCart() {
      const formOutput = {
        item: this.currentItem.item,
        count: this.count,
        options: this.itemOptions,
        addOns: this.itemAddons,
        combinedPrice: this.combinedPrice
      }

      let addOnError = this.$v.itemAddons.$invalid
      let optionError = this.currentItem.options ? this.$v.itemOptions.$invalid : false

      if (addOnError || optionError) {
        this.errors = true
        return
      }

      this.errors = false
      this.cartSubmitted = true
      this.$store.commit('addToCart', formOutput)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 100px auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 400 1fr;
  grid-column-gap: 60px;
  line-height: 2;
}

.image {
  grid-area: 1/1/2/2;
  background-size: cover;
}

.details {
  grid-area: 1/2/2/3;
  position: relative;
}

.options {
  grid-area: 2/1/3/2;
}
</style>