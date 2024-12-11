<template>
  <div :class="statusBoxClass">
    {{ statusText }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

const props = defineProps({
  delta: {
    type: Object as () => Record<string, JSONValue> | null,
    default: null,
  },
})

// Define possible statuses
const status = ref<'draft' | 'archived' | 'published' | 'unknown'>('unknown')

// Check if delta has a status and set it accordingly
if (props.delta && 'status' in props.delta && typeof props.delta.status === 'string') {
  if (['draft', 'archived', 'published'].includes(props.delta.status)) {
    status.value = props.delta.status as 'draft' | 'archived' | 'published'
  }
} else {
  status.value = 'unknown'
}

// Computed property for the class of the status box
const statusBoxClass = computed(() => ({
  'status-box': true,
  draft: status.value === 'draft',
  archived: status.value === 'archived',
  published: status.value === 'published',
  unknown: status.value === 'unknown',
}))

const statusText = computed(() => {
  switch (status.value) {
    case 'draft':
      return 'Draft'
    case 'archived':
      return 'Archived'
    case 'published':
      return 'Published'
    case 'unknown':
    default:
      return 'Unknown'
  }
})
</script>

<style scoped>
.status-box {
  padding: var(--pad-floor);
  border-radius: 5px;
  text-align: center;
  color: white;
}

.draft {
  background-color: #007bff;
}

.archived {
  background-color: #6c757d;
}

.published {
  background-color: #28a745;
}

.unknown {
  background-color: #dc3545;
}
</style>
