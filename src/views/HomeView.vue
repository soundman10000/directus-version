<script setup lang="ts">
import VersionedData from '../components/VersionedData.vue'
import VersionManagement from '../components/VersionManagement.vue'
</script>

<template>
  <div class="main-container">
    <div class="content-container">
      <VersionedData></VersionedData>
    </div>
    <div class="divider"></div>
    <div class="version-container">
      <VersionManagement></VersionManagement>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - var(--pad-floor) * 2);
  overflow: hidden;
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

.divider {
  width: 1px;
  background-color: #ccc;
  margin: 0 20px;
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

  .divider {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }
}
</style>
