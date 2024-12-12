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

    onBeforeMount(async () => {
      data.data = await fetchVersionedData(http).then(
        (z) => z?.data as unknown as VersionedDataItem[],
      )
      state.loading = false
    })

    return {
      state: state,
      data: data,
    }
  },
})
</script>
