<template>
  <FormatHeader title="Management" />
  <div v-if="state.loading" class="d-flex justify-content-center align-items-center loading">
    <Loading></Loading>
  </div>
  <div v-if="!state.loading">
    <VersionedDataTable :data="data.data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, inject } from 'vue'
import { VersionedDataItem, Data } from './VersionManagement.d.ts'
import FormatHeader from './Header.vue'
import Loading from './Loading.vue'
import VersionedDataTable from './VersionManagementTable.vue'

const fetchVersionedData = async (http: AxiosInstance): Promise<ResponseData | undefined> => {
  try {
    return await http.get(`/versions`).then((x) => x.data as ResponseData)
  } catch (error) {
    console.error('Error fetching data:', error)
    return undefined
  }
}

const state = reactive<State>({
  loading: true,
})

const data = reactive<Data>({})

export default defineComponent({
  name: 'VersionManagement',
  components: {
    Loading,
    FormatHeader,
    VersionedDataTable,
  },
  setup() {
    const http = inject<AxiosInstance>('http')

    onBeforeMount(async () => {
      data.data = await fetchVersionedData(http).then((z) => z.data as VersionedDataItem[])
      state.loading = false
    })

    return {
      state: state,
      data: data,
    }
  },
})
</script>

<style scoped>
h1 {
  text-align: center;
  color: var(--color-text);
}

.loading {
  padding-top: 50px;
}
</style>
