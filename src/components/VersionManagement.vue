html
<template>
  <FormatHeader title="Management" />
  <div v-if="state.loading" class="d-flex justify-content-center align-items-center mt-5">
    <Loading></Loading>
  </div>
  <div v-if="!state.loading">
    <VersionedDataTable :data="data.data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, inject } from 'vue'
import type { VersionedDataItem, Data, State } from './VersionManagement.d.ts'
import FormatHeader from './Header.vue'
import Loading from './Loading.vue'
import VersionedDataTable from './VersionManagementTable.vue'
import type { AxiosInstance } from 'axios'
import type { ResponseData } from './VersionedData'
import type { Emitter } from 'mitt'
import type { Events } from '../types/events.ts'

const fetchVersionedData = async (http: AxiosInstance): Promise<ResponseData | null> => {
  try {
    return await http.get(`/versions`).then((x) => x.data)
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

const state = reactive<State>({
  loading: true,
})

const data = reactive<Data>({
  data: [],
  fields: [],
})

export default defineComponent({
  name: 'VersionManagement',
  components: {
    Loading,
    FormatHeader,
    VersionedDataTable,
  },
  setup() {
    const http = inject<AxiosInstance>('http')!
    const emitter = inject<Emitter<Events>>('emitter')!

    emitter.on('event', async () => {
      await handleFetchVersionedData()
    })

    async function handleFetchVersionedData() {
      state.loading = true
      const result = await fetchVersionedData(http)
      data.data = (result?.data ?? []) as VersionedDataItem[]
      state.loading = false
    }

    onBeforeMount(async () => {
      await handleFetchVersionedData()
    })

    return {
      state: state,
      data: data,
    }
  },
})
</script>
