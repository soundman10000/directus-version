<template>
  <div class="card-body">
    <div v-for="(value, key) in data" :key="key" class="mb-2">
      <div class="data-item border border-secondary rounded p-2">
        <div class="data-label small-text text-muted">{{ key }}</div>
        <div class="data-value small-text">{{ formatValue(value) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type JSONPrimitive = string | number | boolean | null
type JSONValue = JSONPrimitive | JSONObject | JSONArray
type JSONArray = Array<JSONValue>
type JSONObject = { [key: string]: JSONValue }

type GenericData = Record<string, JSONValue>

export default defineComponent({
  name: 'VersionChanges',
  props: {
    data: {
      type: Object as PropType<GenericData>,
      required: true,
    },
  },
  methods: {
    formatValue(value: JSONValue): string {
      if (typeof value === 'object') {
        if (value === null) {
          return 'null'
        } else if (Array.isArray(value)) {
          return `[${value.map((v) => this.formatValue(v)).join(', ')}]`
        } else {
          return `{${Object.entries(value)
            .map(([k, v]) => `${k}: ${this.formatValue(v)}`)
            .join(', ')}}`
        }
      }
      return String(value)
    },
  },
})
</script>

<style scoped>
.small-text {
  font-size: 0.75rem;
}

.data-item {
  border-width: 1px;
}

.data-label {
  background: #f8f9fa; /* Light background for the label */
  padding: 2px 4px;
  border-bottom: 1px solid #e9ecef;
}

.data-value {
  padding: 4px;
  word-wrap: break-word; /* Allows long text to wrap */
}
</style>
