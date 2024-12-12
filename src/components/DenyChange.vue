<template>
  <button
    v-if="status === 'submitted' || status === 'approved'"
    class="btn btn-sm btn-danger"
    @click="deny"
  >
    Deny
  </button>
</template>

<script setup lang="ts">
import { inject, ref, type PropType } from 'vue'
import { type AxiosInstance } from 'axios'
import type { VersionedDataItem, Status } from './VersionManagement.d.ts'
import type { Emitter } from 'mitt'
import type { Event, Events } from '../types/events.ts'

const props = defineProps({
  data: {
    type: Object as PropType<VersionedDataItem>,
    required: true,
  },
})

const axios = inject<AxiosInstance>('http')!
const emitter = inject<Emitter<Events>>('emitter')!

const deltaKeys = ref<string[]>([])
const status = ref<Status>()

if (props.data.delta) {
  deltaKeys.value = Object.keys(props.data.delta).filter((key) => key !== 'status')
  if (props.data.delta.status) {
    status.value = props.data.delta.status as Status
  }
}

const deny = async () => {
  const body = {
    status: 'denied',
  }

  try {
    await axios.post(`/versions/${props.data.id}/save`, body)
    emitter.emit('event', { success: true, type: 'deny', message: 'Version denied' })
  } catch (error) {
    emitter.emit('event', { success: false, type: 'deny', message: 'Version denial failed' })
  }
}
</script>
