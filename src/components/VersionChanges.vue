<template>
  <div class="card-body">
    <div v-for="(value, key) in filteredData" :key="key" class="mb-2">
      <div class="data-item rounded">
        <div class="data-label small-text text-muted">{{ key }}</div>
        <div class="data-value small-text">{{ formatValue(value) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatValue, type JSONValue } from './VersionChanges.ts'

type GenericData = Record<string, JSONValue>

export default defineComponent({
  name: 'VersionChanges',
  props: {
    data: {
      type: Object as () => Record<string, JSONValue> | null,
      required: true,
    },
  },
  computed: {
    filteredData() {
      if (!this.data) return {}
      const result: GenericData = {}
      for (const [key, value] of Object.entries(this.data)) {
        if (key !== 'status') {
          result[key] = value
        }
      }
      return result
    },
  },
  methods: {
    formatValue,
  },
})
</script>

<style scoped>
.small-text {
  font-size: 0.75rem;
}

.data-item {
  border: solid 1px var(--color-background);
}

.data-label {
  background: var(--color-background);
  color: var(--color-heading) !important;
  padding: var(--pad-floor);
  font-weight: 600;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.data-value {
  padding: var(--pad-floor);
  word-wrap: break-word;
}
</style>
