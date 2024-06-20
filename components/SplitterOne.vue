<script setup lang="ts">
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';
import {
  Aggregate, ColumnChooser, ColumnMenu, ContextMenu,
  Edit, ExcelExport,
  Filter,
  Freeze,
  Group,
  Page,
  Reorder,
  Resize,
  RowDD,
  Search,
  Selection,
  Sort, Toolbar, VirtualScroll
} from "@syncfusion/ej2-grids"

import type { IMeta} from "~/helpers/types";
import useGridPresenter from "~/composables/useGridPresenter";
import usePolling from "~/composables/usePolling";

provide('grid', [
  Page,
  Sort,
  Edit,
  RowDD,
  Group,
  Search,
  Resize,
  Filter,
  Freeze,
  Reorder,
  Selection,
  Aggregate,
  ColumnMenu,
  ExcelExport,
  ContextMenu,
  ColumnChooser,
  VirtualScroll,
  Toolbar,
])

const meta = reactive<IMeta[]>([]);
async function getMetaData() {
  const resp = await $fetch<IMeta[]>('/api/meta/films')
  if (resp) {
    meta.splice(0, meta.length)
    meta.push(...resp)
  }
}

interface IFilm {
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  producer: string;
  release_date: string;
  title: string;
}
const data = ref<IFilm[]>([]);
async function getData() {
  const resp = await $fetch<IFilm[]>('/api/films/1')
  if (resp) {
    data.value = resp;
  }
}

const { pageOptions, filterOptions, selectionOptions, selectedRow, setEjsGridFormat } = useGridPresenter();
const { refetchData, indicator } = usePolling()
onBeforeMount(async () => {
  await Promise.all([getMetaData(), getData()])
  refetchData(getData)
});

function onDataBound() {
  // console.log("data bound in splitter one component")
}

</script>

<template>
<div class="comp1">
  <EjsGrid
      id="castingSeqGridId"
      ref="castingSeqGrid"
      data-cy="program-book-casting-sequence-grid"
      height="100%"
      :allow-paging="true"
      :page-settings="pageOptions"
      :data-source="data"
      :enable-sticky-header="true"
      :allow-sorting="true"
      :filter-settings="filterOptions"
      :allow-selection="true"
      :selection-settings="selectionOptions"
      :selected-row-index="selectedRow"
      :data-bound="onDataBound"
      grid-lines="Both"
  >
    <EColumns>
      <EColumn
          v-for="header in meta"
          :key="header.field"
          :field="header.field"
          :auto-fit="true"
          :text-align="'Left'"
          :type="header.data_type"
          :format="setEjsGridFormat(header.data_type)"
          :is-primary-key="header.field === 'episode_id'"
          clip-mode="EllipsisWithTooltip"
          :visible="header.is_visible"
          :header-template="'customHeaderTemplate'"
          :header-short-name="header.name_short['de']"
          :header-long-name="header.name_long['de']"
          :header-text="header.name_short['de']"
      />
    </EColumns>
    <template #customHeaderTemplate="{ data }">
      <div v-tooltip="data.headerLongName">
        <p
            id="genericProgramsGridShortHeaderName"
            class="e-headertext !min-w-fit">
          {{ data.headerShortName }}
        </p>
      </div>
    </template>
  </EjsGrid>
</div>
</template>

<style scoped>
.comp1 {
  height: 100%;
}
</style>