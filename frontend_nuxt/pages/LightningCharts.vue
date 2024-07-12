<script setup lang="ts">
import type {LightningChart} from "@arction/lcjs";
import type {IMeta} from "~/helpers/types";

const ls = inject<LightningChart>('lc');

const crimeData = reactive<Record<string, unknown>[]>([]);
async function getData() {
  const { data } = await useFetch<Record<string, unknown>[]>('/api/crimes')
  console.log(data.value)
  if (data.value) {
    crimeData.splice(0, crimeData.length)
    crimeData.push(...data.value)
  }
}

const firstChart = ref<HTMLElement | null>(null);

onBeforeMount(async () => {
  await getData();
})
onMounted(() => {
  const barChart = ls?.BarChart()
  if (firstChart.value && barChart) {

  }
});

</script>

<template>
<div class="w-100 h-100">
  <div ref="firstChart"></div>
</div>
</template>

<style scoped>

</style>