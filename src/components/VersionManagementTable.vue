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
          <td class="dataColumn"><VersionChanges :data="item.delta" /></td>
          <td><VersionStatus :delta="item.delta" /></td>
          <td class="text-center buttonColumn">
            <PromoteChange :id="item.id" :hash="item.hash" :delta="item.delta" />
          </td>
          <td class="text-center buttonColumn">
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
      const date = new Date(dateString)
      const locale = 'en-US'

      return date.toLocaleString(locale, {
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
