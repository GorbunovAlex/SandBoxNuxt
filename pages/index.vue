<script setup lang="ts">

</script>

<template>
<div class="main-page">
  <button @click="navigateTo('/SyncFusionSandBox')">SF</button>
  <button @click="navigateTo('/LightningCharts')">LightningCharts</button>
</div>
</template>

<style scoped>
.main-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
</style>