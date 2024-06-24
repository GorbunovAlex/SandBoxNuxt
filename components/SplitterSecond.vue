<script setup lang="ts">
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn, type LoadEventArgs, type ContextMenuItem, type ContextMenuItemModel, type ContextMenuClickEventArgs } from '@syncfusion/ej2-vue-grids';
import { ToastComponent as EjsToast } from "@syncfusion/ej2-vue-notifications";
import { Sort,
  Edit,
  Group,
  Freeze,
  Search,
  Reorder,
  Aggregate,
  ColumnMenu,
  ExcelExport,
  ContextMenu,
  ColumnChooser,
  VirtualScroll,
  RowDD,
  Selection,
  Toolbar,
  Page,
  Resize,
  Filter, } from "@syncfusion/ej2-grids"
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

import type { IMeta} from "~/helpers/types";
import useGridPresenter from "~/composables/useGridPresenter";
import Refetcher from "~/composables/usePolling";
import {useSwitch} from "~/store/switchStore";

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
  const resp = await $fetch<IMeta[]>('/api/meta/people')
  if (resp) {
    meta.splice(0, meta.length)
    meta.push(...resp)
  }
}

const peopleGrid = ref<EjsGrid | null>(null)
const { pageOptions, filterOptions, selectionOptions, selectedRow, contextMenuItemsBase, setEjsGridFormat } = useGridPresenter();
function load(args: LoadEventArgs) {
  if (peopleGrid.value) {
    peopleGrid.value?.$el.addEventListener('keydown', console.log(args));
  }
};


async function refetch() {
  await peopleGrid.value?.refresh();
}
const dataSource = new DataManager({
  url: '/api/people',
  adaptor: new UrlAdaptor(),
})
onBeforeMount(async () => {
  await Promise.all([getMetaData()])
  Refetcher.instance(refetch)
});

const contextMenuItems = ref<ContextMenuItemModel[]>([])
const contextMenuItemsAnother: ContextMenuItemModel[] = [
  {
    text: "Click context another",
    target: '.e-content',
    id: 'click',
    iconCss: 'e-icons e-people',
  },
]
const switchStore = useSwitch();
const isSwitch = computed(() => switchStore.someSwitching)
watch(isSwitch, () => {
  contextMenuItems.value = isSwitch.value ? contextMenuItemsAnother : contextMenuItemsBase
}, { immediate: true })
function contextMenuClickHandler(args: ContextMenuClickEventArgs) {
  const itemId = args.item.id;
  if (itemId === 'click') {
    invokeToast();
  }
}

const toastComponent = ref<EjsToast | null>(null)
function invokeToast() {
  if (toastComponent.value) {
    console.log("Invoked toast")
    toastComponent.value.show();
  }
}

</script>

<template>
  <div class="comp2">
    <EjsGrid
        id="peopleGrid"
        ref="peopleGrid"
        data-cy="program-book-casting-sequence-grid"
        height="100%"
        :allowPaging="true"
        :allowResizing="true"
        :allowSelection="true"
        :allowGrouping="false"
        :allowSorting="true"
        :allowMultiSorting="true"
        :autoFit="true"
        :allowReordering="false"
        :enablePersistence="true"
        :allowRowDragAndDrop="true"
        :data-source="dataSource"
        :enable-sticky-header="true"
        :page-settings="pageOptions"
        :filter-settings="filterOptions"
        :allowFiltering="true"
        :selection-settings="selectionOptions"
        :selected-row-index="selectedRow"
        :rowHeight="20"
        :contextMenuItems="contextMenuItems"
        :context-menu-click="contextMenuClickHandler"
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
    <ejs-toast
        :showCloseButton="true"
        :position="{ X: 'Right', Y: 'Top' }"
        ref='toastComponent'
        title='Matt sent you a friend request'
        content='Hey, wanna dress up as wizards and ride our hoverboards?'
    />
  </div>
</template>

<style scoped>
.comp2 {
  height: 100%;
}
</style>