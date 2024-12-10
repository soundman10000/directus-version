<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <thead class="bg-primary text-white">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Key</th>
          <th scope="col">Date Updated</th>
          <th scope="col">Delta</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.key }}</td>
          <td>{{ formatDate(item.date_updated) }}</td>
          <td>{{ item.delta === null ? 'None' : item.delta }}</td>
          <td class="text-center">
            <button
              v-if="item.delta !== null"
              class="btn btn-sm btn-success"
              @click="edit(item.id)"
            >
              Promote
            </button>
          </td>
          <td class="text-center">
            <button
              v-if="item.delta !== null"
              class="btn btn-sm btn-danger"
              @click="deleteItem(item.id)"
            >
              Deny
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VersionedDataItem } from './VersionManagement.d.ts'

export default defineComponent({
  name: 'VersionedDataTable',
  props: {
    data: {
      type: Array as PropType<VersionedDataItem[]>,
      required: true,
    },
  },
  methods: {
    edit(id: string) {
      console.log('Edit item with ID:', id)
    },
    deleteItem(id: string) {
      console.log('Delete item with ID:', id)
    },
    formatDate(dateString: string): string {
      const date = new Date(dateString)
      const locale = 'en-US'

      return date.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    },
  },
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
