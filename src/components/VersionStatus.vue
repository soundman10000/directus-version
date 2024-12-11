<template>
  <div :class="statusBoxClass">
    {{ statusText }}
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

const statusBoxClass = computed(() => ({
  'status-box': true,
  draft: status.value === 'draft',
  submitted: status.value === 'submitted',
  published: status.value === 'published',
  approved: status.value === 'approved',
}))

const statusText = computed(() => {
  switch (status.value) {
    case 'draft':
      return 'Draft'
    case 'submitted':
      return 'Submitted'
    case 'approved':
      return 'Approved'
    case 'published':
      return 'Published'
    default:
      return 'Unknown'
  }
})
</script>

<style scoped>
.status-box {
  padding: var(--pad-floor);
  border-radius: 0;
  text-align: center;
  color: white;
  background: none;
  border: none;
  box-shadow: none;
  cursor: default;
}
.draft {
  background-color: #2c2c2c;
}

.submitted {
  background-color: #ffc107;
}

.approved {
  background-color: #28a745;
}

.published {
  background-color: #007bff;
}

.unknown {
  background-color: #dc3545;
}
</style>
