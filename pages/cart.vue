<template>
  <main class="container cart">
    <h2>Cart</h2>

    <table v-if="cart.length">
      <thead>
        <tr>
          <th>Item</th>
          <th>Add Ons</th>
          <th>Amount</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cartItem in cart" :key="cartItem.id">
          <td>
            {{ cartItem.item }}
            <span v-if="cartItem.options">- {{ cartItem.options }}</span>
          </td>
          <td>
            <span v-if="cartItem.addOns.length" v-for="addOn in cartItem.addOns" :key="addOn" class="comma">
              {{ addOn }}
            </span>
          </td>
          <td>{{ cartItem.count }}</td>
          <td>{{ cartItem.combinedPrice }}</td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td class="total">Total: ${{ totalPrice }}</td>
        </tr>
      </tbody>
    </table>
    <AppEmptyCart v-else />
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AppEmptyCart from '../components/AppEmptyCart.vue';

export default {
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["totalPrice"])
  },
  components: { AppEmptyCart }
}
</script>

<style lang="scss" scoped>

</style>