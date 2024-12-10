<template>
  <div>
    <h1>Versioned Data</h1>
    <Loading v-if="state.loading"></Loading>
    <div v-if="!state.loading">
      <span>{{ data.data.text_block_1 }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onErrorCaptured, inject, reactive } from 'vue'
import type { AxiosInstance } from 'axios'
import { ResponseData } from './VersionedData.d.ts'
import Loading from './Loading.vue'

const fetchVersionedData = async (http: AxiosInstance): Promise<ResponseData | undefined> => {
  try {
    return await http
      .get('/items/versioned_data/EDE514BA-0AD7-43E9-ADE9-E971A189D463')
      .then((x) => x.data as ResponseData)
  } catch (error) {
    console.error('Error fetching data:', error)
    return undefined
  }
}

export default defineComponent({
  name: 'VersionedData',
  components: {
    Loading,
  },
  setup() {
    const state = reactive({
      loading: true,
    })

    const data = reactive({
      data: null,
    })

    const http = inject<AxiosInstance>('http')

    onBeforeMount(async () => {
      data.data = await fetchVersionedData(http).then((z) => z.data)
      state.loading = false
    })

    onMounted(() => {
      console.log('onMounted: Component has been mounted')
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
  color: var(--color-text);
}
</style>
