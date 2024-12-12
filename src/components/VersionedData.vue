html
<template>
  <FormatHeader title="Data" />
  <div v-if="state.loading" class="d-flex justify-content-center align-items-center mt-5">
    <Loading></Loading>
  </div>
  <div v-if="!state.loading">
    <div class="mb-3">
      <label for="textBlock1" class="form-label">Text Block 1</label>
      <span id="textBlock1" class="form-control-plaintext bg-light border rounded p-2">{{
        data.data?.text_block_1
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, inject, reactive } from 'vue'
import type { AxiosInstance } from 'axios'
import { useRoute } from 'vue-router'
import type { ResponseData, State, Data } from './VersionedData.d.ts'
import FormatHeader from './Header.vue'
import Loading from './Loading.vue'

const fetchData = async (http: AxiosInstance, pk: string): Promise<ResponseData | null> => {
  try {
    return await http.get(`/items/versioned_data/${pk}`).then((x) => x.data)
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

const state = reactive<State>({
  loading: true,
})

const data = reactive<Data>({
  data: null,
})

export default defineComponent({
  name: 'VersionedData',
  components: {
    Loading,
    FormatHeader,
  },
  setup() {
    const route = useRoute()
    const pk = route.params.pk as string

    const http = inject<AxiosInstance>('http')!

    onBeforeMount(async () => {
      data.data = await fetchData(http, pk).then((z) => z?.data ?? null)
      state.loading = false
    })

    return {
      state: state,
      data: data,
    }
  },
})
</script>
