<script setup lang="ts">
import { SplitterComponent as EjsSplitter, PanesDirective as EPanes, PaneDirective as Epane } from "@syncfusion/ej2-vue-layouts";
import { registerLicense } from '@syncfusion/ej2-base';
import {SplitterOne, SplitterSecond, SplitterThird} from "#components";

registerLicense(import.meta.env.VITE_SF_KEY);

function first() {
  return {
    template: SplitterOne
  }
}

function second() {
  return {
    template: SplitterSecond
  }
}

function third() {
  return {
    template: SplitterThird
  }
}
</script>

<template>
  <div class="main">
    <EjsSplitter id='default-splitter' height='250px' width="50%" :orientation="'Horizontal'">
      <EPanes>
        <Epane :content="first"></Epane>
        <Epane :content="second"></Epane>
        <Epane :content="third"></Epane>
      </EPanes>
    </EjsSplitter>
  </div>
</template>

<style scoped>
@import './node_modules/@syncfusion/ej2-base/styles/material.css';
@import './node_modules/@syncfusion/ej2-vue-layouts/styles/material.css';

.main {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>