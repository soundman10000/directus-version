<template>
  <div
    :class="[
      'alert',
      'alert-dismissible',
      'fade',
      'show',
      'text-center',
      'm-0',
      'p-2',
      statusBoxClass,
    ]"
  >
    <div class="properCase">{{ status }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Status } from './VersionManagement.d.ts'

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

const props = defineProps({
  delta: {
    type: Object as () => Record<string, JSONValue>,
  },
})

const status = ref<Status>()

status.value = props.delta?.status as Status

const statusBoxClass = computed(() => {
  switch (status.value) {
    case 'draft':
      return 'alert-dark'
    case 'submitted':
      return 'alert-warning'
    case 'approved':
      return 'alert-success'
    case 'published':
      return 'alert-primary'
    case 'denied':
    default:
      return 'alert-danger'
  }
})
</script>

<style scoped>
.properCase {
  text-transform: capitalize;
}
</style>
