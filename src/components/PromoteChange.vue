<template>
  <button v-if="status === 'approved'" class="btn btn-sm btn-success" @click="promote">
    Promote
  </button>
  <button v-if="status === 'submitted'" class="btn btn-sm btn-primary" @click="approve">
    Approve
  </button>
</template>

<script setup lang="ts">
import { inject, ref, type PropType } from 'vue'
import { type AxiosInstance } from 'axios'
import type { VersionedDataItem, Status } from './VersionManagement.d.ts'

const props = defineProps({
  data: {
    type: Object as PropType<VersionedDataItem>,
    required: true,
  },
})

const axios = inject<AxiosInstance>('http')!

const deltaKeys = ref<string[]>([])
const status = ref<Status>()

if (props.data.delta) {
  deltaKeys.value = Object.keys(props.data.delta).filter((key) => key !== 'status')
  if (props.data.delta.status) {
    status.value = props.data.delta.status as Status
  }
}

const promote = async () => {
  const body = {
    mainHash: props.data.hash,
    fields: deltaKeys.value,
  }

  try {
    const response = await axios.patch(`/versions/${props.data.id}/promote`, body)
    console.log('Item promoted:', response.data)
  } catch (error) {
    console.error('Failed to promote item:', error)
  }
}

const approve = async () => {
  const body = {
    status: 'approved',
  }

  try {
    const response = await axios.post(`/versions/${props.data.id}/save`, body)
    console.log('Item approved:', response.data)
  } catch (error) {
    console.error('Failed to approve item:', error)
  }
}
</script>
