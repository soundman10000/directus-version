<template>
  <h1>Data</h1>
  <div v-if="state.loading" class="d-flex justify-content-center align-items-center loading">
    <Loading></Loading>
  </div>
  <div v-if="!state.loading">
    <div class="mb-3">
      <label class="form-label">Text Block 1</label>
      <span class="form-control-plaintext bg-light border rounded p-2">{{
        data.data?.text_block_1
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onErrorCaptured, inject, reactive } from 'vue'
import type { AxiosInstance } from 'axios'
import { ResponseData, State, Data } from './VersionedData.d.ts'
import Loading from './Loading.vue'

const fetchVersionedData = async (
  http: AxiosInstance,
  guid: string,
): Promise<ResponseData | undefined> => {
  try {
    return await http.get(`/items/versioned_data/${guid}`).then((x) => x.data as ResponseData)
  } catch (error) {
    console.error('Error fetching data:', error)
    return undefined
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
  },
  setup() {
    const http = inject<AxiosInstance>('http')

    onBeforeMount(async () => {
      data.data = await fetchVersionedData(http, 'EDE514BA-0AD7-43E9-ADE9-E971A189D463').then(
        (z) => z.data,
      )
      state.loading = false
    })

    onErrorCaptured((err: unknown, instance: ComponentPublicInstance | null, info: string) => {
      console.log('errorCaptured: an error has been captured', err, info)
      return false
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
