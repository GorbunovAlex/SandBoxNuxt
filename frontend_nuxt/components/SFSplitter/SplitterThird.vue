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

import type { IMeta } from "~/helpers/types";
import useGridPresenter from "~/composables/useGridPresenter";
// import usePolling from "~/composables/usePolling";
import {DataManager, UrlAdaptor} from "@syncfusion/ej2-data";

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
  const resp = await $fetch<IMeta[]>('/api/meta/planets')
  if (resp) {
    meta.splice(0, meta.length)
    meta.push(...resp)
  }
}

// interface IPlanet {
//   climate: string;
//   created: string;
//   diameter: string;
//   edited: string;
//   gravity: string;
//   name: string;
//   orbital_period: string;
//   population: string;
//   rotation_period: string;
//   surface_water: string;
//   terrain: string;
// }
// const data = ref<IPlanet[]>([]);
// async function getData() {
//   const resp = await $fetch<IPlanet[]>('/api/planets')
//   if (resp) {
//     data.value = resp
//   }
// }

const planetsGrid = ref<EjsGrid | null>(null)
const { pageOptions, filterOptions, selectionOptions, selectedRow, setEjsGridFormat } = useGridPresenter();

// const { refetchData, indicator } = usePolling()
async function refetch() {
  await planetsGrid.value?.refresh();
}
const dataSource = new DataManager({
  url: '/api/planets',
  adaptor: new UrlAdaptor(),
})
onBeforeMount(async () => {
  await Promise.all([getMetaData()])
  // refetchData(refetch)
});

</script>

<template>
  <div class="comp3">
    <EjsGrid
        id="planetsGrid"
        ref="planetsGrid"
        data-cy="program-book-casting-sequence-grid"
        height="100%"
        :allow-paging="true"
        :data-source="dataSource"
        :enable-sticky-header="true"
        :allow-sorting="true"
        :page-settings="pageOptions"
        :filter-settings="filterOptions"
        :allow-selection="true"
        :selection-settings="selectionOptions"
        :selected-row-index="selectedRow"
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
.comp3 {
  height: 100%;
}
</style>