export interface IMeta {
    field: string;
    data_type: string;
    is_visible: boolean;
    name_long: {
        en: string;
        de: string;
    };
    name_short: {
        en: string;
        de: string;
    };
}

export interface IGenericDataSource<T> {
    count: number,
    results: T[]
}