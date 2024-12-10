<template>
  <div class="spinner" :class="{ 'spinner--dark': isDark }"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SpinnerComponent',
  props: {
    isDark: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
})
</script>

<style scoped>
.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top: 3px solid #007bff;
  animation: spin 1s linear infinite;
}

.spinner--dark {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffffff;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
