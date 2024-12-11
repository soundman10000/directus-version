<template>
  <div class="full-width-underline">
    <h1>{{ title }}</h1>
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

<style scoped>
.full-width-underline {
  text-align: center;
  position: relative;
  padding-bottom: var(--pad-sm);
  margin-bottom: var(--margin-xs);
}

.full-width-underline::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: var(--color-border);
}

.full-width-underline h1 {
  margin-bottom: 0;
}
</style>
