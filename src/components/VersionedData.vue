<template>
  <FormatHeader title="Data" />
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
import {
  defineComponent,
  onBeforeMount,
  onErrorCaptured,
  inject,
  reactive,
  type ComponentPublicInstance,
} from 'vue'
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
    const guid = route.params.guid as string

    const http = inject<AxiosInstance>('http')
    if (!http) {
      throw 'Http Router not found'
    }

    onBeforeMount(async () => {
      data.data = await fetchData(http, guid).then((z) => z?.data ?? null)
      state.loading = false
    })

    onErrorCaptured((err: unknown, _instance: ComponentPublicInstance | null, info: string) => {
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
