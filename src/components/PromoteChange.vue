<template>
  <button class="btn btn-sm btn-success" @click="promote">Promote</button>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { type AxiosInstance } from 'axios'

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

const props = defineProps({
  versionKey: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  collection: {
    type: String,
    required: true,
  },
  delta: {
    type: Object as () => Record<string, JSONValue> | null,
    default: null,
  },
})

const axios = inject<AxiosInstance>('http')

const deltaKeys = ref<string[]>([])

if (props.delta) {
  deltaKeys.value = Object.keys(props.delta).filter((key) => key !== 'status')
}

const promote = () => {
  if (!axios) {
    return
  }

  axios
    .patch(`/items/${props.collection}/${props.id}?version=${props.versionKey}&action=promote`, {
      fields: deltaKeys.value,
    })
    .then((response) => {
      console.log('Item promoted:', response.data)
    })
    .catch((error) => {
      console.error('Failed to promote item:', error)
    })
}
</script>
