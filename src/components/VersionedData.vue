<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onErrorCaptured, ref, inject } from 'vue'
import type { AxiosInstance } from 'axios'
import { ResponseData } from './VersionedData.d.ts'

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
  setup() {
    const http = inject<AxiosInstance>('http')
    const message = ref('Hello from Vue 3 Component!')

    onBeforeMount(async () => {
      const result = await fetchVersionedData(http)
      console.log(result)
    })

    onMounted(() => {
      console.log('onMounted: Component has been mounted')
    })

    onErrorCaptured((err: unknown, instance: ComponentPublicInstance | null, info: string) => {
      console.log('errorCaptured: an error has been captured', err, info)
      return false
    })

    return {
      message,
    }
  },
})
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
