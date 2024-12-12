<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead class="bg-primary text-white">
        <tr>
          <th scope="col">Collection</th>
          <th scope="col" class="d-none d-md-table-cell">Updated</th>
          <th scope="col">Changes</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="data.length === 0">
          <td :colspan="6" class="text-center">No Versions</td>
        </tr>
        <tr v-else v-for="item in data" :key="item.id">
          <td>{{ item.collection }}</td>
          <td class="d-none d-md-table-cell">{{ formatDate(item.date_updated) }}</td>
          <td class="dataColumn">
            <VersionChanges :data="item.delta as Record<string, JSONValue>" />
          </td>
          <td class="text-center statusColumn align-middle">
            <VersionStatus :delta="item.delta as Record<string, JSONValue>" />
          </td>
          <td class="text-center buttonColumn align-middle">
            <PromoteChange :data="item" />
          </td>
          <td class="text-center buttonColumn align-middle">
            <DenyChange :data="item" />
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
import DenyChange from './DenyChange.vue'
import VersionStatus from './VersionStatus.vue'
import type { JSONValue } from './VersionChanges.ts'

const dateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

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
    DenyChange,
  },
  methods: {
    deleteItem(id: string) {
      console.log('Delete item with ID:', id)
    },
    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleString('en-US', dateFormat)
    },
  },
})
</script>

<style scoped>
.buttonColumn {
  width: 75px;
}
.dataColumn {
  width: 350px;
}
.statusColumn {
  max-width: 100px;
}
</style>
