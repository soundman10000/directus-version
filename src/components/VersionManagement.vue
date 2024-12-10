<template>
  <h1>Management</h1>
  <div v-if="state.loading" class="d-flex justify-content-center align-items-center loading">
    <Loading></Loading>
  </div>
  <div v-if="!state.loading">
    <button type="button" class="btn btn-success">Success</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from 'vue'
import { State, Data } from './VersionManagement.d.ts'
import Loading from './Loading.vue'

const state = reactive<State>({
  loading: true,
})

const data = reactive<Data>({})

export default defineComponent({
  name: 'VersionManagement',
  components: {
    Loading,
  },
  setup() {
    onBeforeMount(() => {
      // state.loading = false
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
