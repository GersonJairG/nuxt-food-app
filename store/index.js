import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  fooddata: [],
  cart: []
});

export const getters = {
  totalPrice: state => {
    return state.cart.reduce((acc, item) => acc + +item.combinedPrice, 0).toFixed(2)
  },
  cartCount: state => {
    return state.cart.reduce((acc, item) => acc + +item.count, 0)
  }
}

export const mutations = {
  updateFoodData: (state, data) => {
    state.fooddata = data;
  },
  addToCart: (state, formOutput) => {
    state.cart.push({
      id: uuidv4(),
      ...formOutput
    })
  }
};

export const actions = {
  async getFoodData({ state, commit }) {
    if (state.fooddata.length) return;
    try {
      await fetch(
        "https://dva9vm8f1h.execute-api.us-east-2.amazonaws.com/production/restaurants",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.AWS_API_KEY,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          commit("updateFoodData", data);
        });
    } catch (error) {
      console.warn(error)
    }
  },
};
