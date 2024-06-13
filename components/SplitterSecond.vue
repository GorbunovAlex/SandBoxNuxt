<script setup lang="ts">
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';
import { Page } from "@syncfusion/ej2-grids"
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

import type { IMeta} from "~/helpers/types";
import useGridPresenter from "~/composables/useGridPresenter";
import usePolling from "~/composables/usePolling";

provide('grid', [
  Page
])

const meta = reactive<IMeta[]>([]);
async function getMetaData() {
  const resp = await $fetch<IMeta[]>('/api/meta/people')
  if (resp) {
    meta.splice(0, meta.length)
    meta.push(...resp)
  }
}

// interface ICharacter {
//   birth_year: string;
//   eye_color: string;
//   gender: string;
//   hair_color: string;
//   height: string;
//   homeworld: string;
//   mass: string;
//   name: string;
//   skin_color: string;
//   created: string;
//   edited: string;
// }
// const data = ref<ICharacter[]>([]);
// async function getData() {
//   const resp = await $fetch<ICharacter[]>('/api/people')
//   if (resp) {
//    data.value = resp
//   }
// }

const peopleGrid = ref<EjsGrid | null>(null)
const { pageOptions, filterOptions, selectionOptions, selectedRow, setEjsGridFormat } = useGridPresenter();

const { refetchData, indicator } = usePolling()
async function refetch() {
  await peopleGrid.value?.refresh();
}
const dataSource = new DataManager({
  url: '/api/people',
  adaptor: new UrlAdaptor(),
})
onBeforeMount(async () => {
  await Promise.all([getMetaData()])
  refetchData(refetch)
});

</script>

<template>
  <div class="comp2">
    <EjsGrid
        id="peopleGrid"
        ref="peopleGrid"
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
.comp2 {
  height: 100%;
}
</style>