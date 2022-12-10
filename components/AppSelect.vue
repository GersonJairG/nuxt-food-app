<template>
  <div class="select">
    <label :for="select">What {{ select }} do you want?</label>
    <select :name="select" :id="select" @change="$emit('change', $event.target.value)">
      <option value=""> -- Please select a {{ select }}</option>
      <option v-for="option in selectOptions" :key="option" :value="option">{{  option  }}</option>
    </select>
  </div>
</template>

<script>

export default {
  props: {
    select: {
      type: String,
      default: ''
    },
    selectOptions: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .select {
    display: flex;
    flex-direction: column;
  }
</style>