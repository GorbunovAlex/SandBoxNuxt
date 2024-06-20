<script setup lang="ts">
import { SplitterComponent as EjsSplitter, PanesDirective as EPanes, PaneDirective as Epane } from "@syncfusion/ej2-vue-layouts";
import { registerLicense } from '@syncfusion/ej2-base';

import SplitterOne from './components/SplitterOne.vue';
import SplitterSecond from './components/SplitterSecond.vue';
import SplitterThird from './components/SplitterThird.vue';

registerLicense(import.meta.env.VITE_SF_KEY);

const counter = ref(10);
function tenSecondsReverseCounter() {
  setTimeout(() => {
    if (counter.value > 0) {
      counter.value--;
    } else {
      counter.value = 10;
    }
    tenSecondsReverseCounter();
  }, 1000);
}
onMounted(() => {
  tenSecondsReverseCounter();
})

const someSwitching = ref(false);
</script>

<template>
  <div class="main">
    <div class="submain">
      <button @click="someSwitching = !someSwitching">Switch</button>
      {{someSwitching}}
      {{counter}}
      <EjsSplitter  id='default-splitter' :orientation="'Vertical'">
        <EPanes>
          <Epane :content="'content1'" :resizable="someSwitching ? false : true"  :size="someSwitching ? '10px' : '100px'" :min="'10px'" >
            <template #content1>
              <SplitterOne />
            </template>
          </Epane>
          <Epane :content="'content2'" :size="'700px'" :min="'10px'" >
            <template #content2>
              <SplitterSecond />
            </template>
          </Epane>
          <Epane :content="'content3'" :size="'100px'" :min="'10px'" >
            <template #content3>
              <SplitterThird />
            </template>
          </Epane>
        </EPanes>
      </EjsSplitter>
    </div>
  </div>
</template>

<style>
@import "./node_modules/@syncfusion/ej2/material3.css";
@import "assets/main.css";

.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submain {
  width: 90%;
  height: 90%;
}
</style>