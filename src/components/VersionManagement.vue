<template>
  <button type="button" class="btn btn-success">Success</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'VersionManagement',
  setup() {
    const state = reactive({})
    const data = reactive({})

    return {
      state: state,
      data: data,
    }
  },
})
</script>
