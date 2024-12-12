<template>
  <div class="text-center mb-3">
    <h1 class="border-bottom pb-2 mb-0">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'UnderlinedTitle',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
})
</script>
