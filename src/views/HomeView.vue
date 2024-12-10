<script setup lang="ts">
import VersionedData from '../components/VersionedData.vue'
import VersionManagement from '../components/VersionManagement.vue'
</script>

<template>
  <div class="main-container">
    <div class="content-container">
      <VersionedData></VersionedData>
    </div>
    <div class="version-container">
      <VersionManagement></VersionManagement>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.content-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.version-container {
  flex: 1;
  padding: 20px;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }

  .content-container,
  .version-container {
    flex: none;
    width: 100%;
  }
}
</style>
