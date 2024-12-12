<template>
  <div class="card-body">
    <div v-for="(value, key) in filteredData" :key="key">
      <div class="card border">
        <div class="card-header bg-secondary small p-2 font-weight-bold text-white">{{ key }}</div>
        <div class="card-body small p-2">{{ formatValue(value) }}</div>
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
      const result: GenericData = {}
      for (const [key, value] of Object.entries(this.data ?? [])) {
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
