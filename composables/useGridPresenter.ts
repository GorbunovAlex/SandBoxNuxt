import type {FilterSettingsModel, SelectionSettingsModel} from "@syncfusion/ej2-vue-grids";

export default function useGridPresenter() {
    const selectedRow = ref(0);

    const pageOptions = {
        pageCount: 4,
        pageSizes: [50, 100, 200, 500],
        pageSize: 0,
    };

    const filterOptions: FilterSettingsModel = {
        type: 'Menu',
        ignoreAccent: true,
    };

    const selectionOptions: SelectionSettingsModel = {
        type: 'Single',
        mode: 'Row',
        // setting this to true currently prevents the grid from marking the first row as selected on grid load
        // persistSelection: true,
    };

    const contextMenuItems = [
        'Delete',
        'Edit',
        'Save',
        'Cancel',
        'Update',
    ]

    function setEjsGridFormat(dataType: string) {
        if (dataType === 'datetime') {
            return {
                type: 'dateTime',
                format: 'YYYY-MM-DD HH:mm',
            };
        } else if (dataType === 'date') {
            return {
                type: 'date',
                format: 'YYYY-MM-DD',
            };
        } else {
            return '';
        }
    }


    return {
        selectedRow,
        pageOptions,
        filterOptions,
        selectionOptions,
        contextMenuItems,

        setEjsGridFormat
    }
}