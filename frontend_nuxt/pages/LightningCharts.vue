<script setup lang="ts">
import {type LightningChart, LineSeries, PointLineAreaSeries} from "@arction/lcjs";

import { webSocketManager } from '@/helpers/websocket'
import type { ICrimeRecord } from "~/helpers/types";
import type {IMarketData} from "~/types/data";

const crimeData = ref<ICrimeRecord[]>([]);
async function getData() {
  const { data } = await useFetch<ICrimeRecord[]>('/api/crimes', {
    method: 'post',
    body: {
      take: 10000,
      skip: 0,
    }
  })
  if (data.value) {
    crimeData.value = data.value
  }
}

const chartPremisData = ref<{ category: string; value: number; }[]>([]);
const chartDistNumberData = ref<{i: number; rpt: number; }[]>([]);
onBeforeMount(async () => {
  await getData();
  const uniqueCrimePremises = new Set(crimeData.value.map(crime => crime.premis_desc));
    chartPremisData.value = Array.from(uniqueCrimePremises).map(premis => {
      return {
        category: premis,
        value: crimeData.value.filter(crime => crime.premis_desc === premis).length
      }
    });
    chartDistNumberData.value = crimeData.value.map((crime, index) => {
      return {
        i: crime.crm_cd,
        rpt: crime.rpt_dist_no
      };
    });
})
const marketData = ref<{ x: number; y: number; }[]>([]);
const counter = ref(0);
onMounted(() => {
  createLineChart();
  const ws = webSocketManager.getSocketInstance();
  if (ws) {
    ws.onmessage = (event) => {
      const data: IMarketData = JSON.parse(event.data);
      if (data) {
        marketData.value.push({
          x: counter.value,
          y: data.LASTVOLUMETO
        })
        counter.value = counter.value + 10;
      }
    }
  }
});

const ls = inject<LightningChart>('lc');

const firstChart = ref<HTMLDivElement | null>(null);
function createPremisChart() {
 if (firstChart.value) {
  const barChart = ls?.BarChart({
      container: firstChart.value,
    })
  barChart?.setData(chartPremisData.value)
 }
}
watch(chartPremisData, createPremisChart, { immediate: true })

const lineSeries = ref<PointLineAreaSeries | null>(null);
function createLineChart() {
  const xyChart = ls?.ChartXY({
    container: 'lineChart'
  })
  if (xyChart) {
    xyChart.onSeriesBackgroundMouseClick((series, event) => {
      console.log('user clicked series area', event)
      console.log('user clicked series', series)
    })
    lineSeries.value = xyChart.addPointLineAreaSeries({ dataPattern: 'ProgressiveX' })
    lineSeries.value.add(marketData.value)
  }
}
function updateLineChart() {
  if (lineSeries.value) {
    lineSeries.value.add(marketData.value)
  }
}
watch(() => marketData.value.length, updateLineChart)


</script>

<template>
<div class="w-100 h-100">
  <div class="w-100 h-100" ref="firstChart" />
  <div id="lineChart" class="w-100 h-100" />
</div>
</template>

<style scoped>

</style>