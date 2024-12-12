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

const promote = async () => {
  const body = {
    mainHash: props.data.hash,
    fields: deltaKeys.value,
  }

  try {
    await axios.post(`/versions/${props.data.id}/promote`, body)
    await axios.delete(`/versions/${props.data.id}`)
    emitter.emit('event', { success: true, type: 'promote', message: 'Version promoted' })
  } catch (error) {
    emitter.emit('event', { success: false, type: 'promote', message: 'Version promotion failed' })
  }
}

const approve = async () => {
  const body = {
    status: 'approved',
  }

  try {
    await axios.post(`/versions/${props.data.id}/save`, body)
    emitter.emit('event', { success: true, type: 'approve', message: 'Version approved' })
  } catch (error) {
    emitter.emit('event', { success: false, type: 'approve', message: 'Version approval failed' })
  }
}
</script>
