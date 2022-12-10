<template>
  <div v-if="show" :class="`toast ${theme}`">
    <span class="close" @click="closeAlert">x</span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    show: {
      required: true,
      type: Boolean,
      default: false
    },
    closeAlert: {
      required: true,
      type: Function,
      default: () => {}
    },
    theme: {
      type: String,
      default: 'error'
    }
  }
}
</script>

<style lang="scss" scoped>

.success {
  background-color: #06a82c;
}

.warn {
  background-color: #ff8400;
}

.info {
  background-color: #062fa8;
}

.error {
  background-color: #a8060e;
}
</style>