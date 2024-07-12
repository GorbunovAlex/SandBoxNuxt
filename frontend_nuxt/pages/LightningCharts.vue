<script setup lang="ts">
import type {LightningChart} from "@arction/lcjs";

import type { ICrimeRecord } from "~/helpers/types";

const crimeData = reactive<ICrimeRecord[]>([]);
async function getData() {
  const { data } = await useFetch<ICrimeRecord[]>('/api/crimes', {
    method: 'post',
    body: {
      take: 10000,
      skip: 0,
    }
  })
  if (data.value) {
    crimeData.splice(0, crimeData.length)
    crimeData.push(...data.value)
  }
}
onBeforeMount(async () => {
  await getData();
  const uniqueCrimePremises = new Set(crimeData.map(crime => crime.premis_desc));
    chartPremisData.value = Array.from(uniqueCrimePremises).map(premis => {
      return {
        category: premis,
        value: crimeData.filter(crime => crime.premis_desc === premis).length
      }
    })
})
const ls = inject<LightningChart>('lc');
const firstChart = ref<HTMLDivElement | null>(null);
const chartPremisData = ref<{ category: string; value: number; }[]>([]);
function createPremisChart() {
 if (firstChart.value) {
  const barChart = ls?.BarChart({
      container: firstChart.value,
    })
  barChart?.setData(chartPremisData.value)
 }
}
watch(() => chartPremisData.value, createPremisChart, { immediate: true })

</script>

<template>
<div class="w-100 h-100">
  <div class="w-100 h-100" ref="firstChart" />
</div>
</template>

<style scoped>

</style>