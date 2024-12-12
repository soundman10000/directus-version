<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="spinner-border" role="status" :class="{ 'text-light': isDark }">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

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
