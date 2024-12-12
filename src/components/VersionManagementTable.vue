<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead class="bg-primary text-white">
        <tr>
          <th scope="col">Collection</th>
          <th scope="col">Updated</th>
          <th scope="col">Changes</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.collection }}</td>
          <td>{{ formatDate(item.date_updated) }}</td>
          <td class="dataColumn">
            <VersionChanges :data="item.delta as Record<string, JSONValue>" />
          </td>
          <td class="align-middle">
            <VersionStatus :delta="item.delta as Record<string, JSONValue>" />
          </td>
          <td class="text-center buttonColumn align-middle">
            <PromoteChange :data="item" />
          </td>
          <td class="text-center buttonColumn align-middle">
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
import { defineComponent, type PropType } from 'vue'
import type { VersionedDataItem } from './VersionManagement.d.ts'
import VersionChanges from './VersionChanges.vue'
import PromoteChange from './PromoteChange.vue'
import VersionStatus from './VersionStatus.vue'
import type { JSONValue } from './VersionChanges.ts'

export default defineComponent({
  name: 'VersionedDataTable',
  props: {
    data: {
      type: Array as PropType<VersionedDataItem[]>,
      required: true,
    },
  },
  components: {
    VersionChanges,
    PromoteChange,
    VersionStatus,
  },
  methods: {
    deleteItem(id: string) {
      console.log('Delete item with ID:', id)
    },
    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    },
  },
})
</script>

<style scoped>
.buttonColumn {
  width: 100px;
}
.dataColumn {
  width: 350px;
}
</style>
