export interface Sort {
    name: string;
    direction: 'descending' | 'ascending';
}
export type SyncFusionFilterPredicate =
    | 'startswith'
    | 'endswith'
    | 'contains'
    | 'equal'
    | 'notequal'
    | 'greaterthan'
    | 'lessthan'
    | 'greaterthanorequal'
    | 'doesnotstartwith'
    | 'doesnotendwith'
    | 'doesnotcontain'
    | 'like'
    | 'isempty'
    | 'isnotempty'
    | 'lessthanorequal';
export interface Predicates {
    field: string;
    ignoreAccent: boolean;
    ignoreCase: boolean;
    isComplex: boolean;
    operator: SyncFusionFilterPredicate;
    value: string | number | string[];
    predicates?: Array<Predicates>;
    condition?: 'and' | 'or';
}
export interface BodyData {
    requiresCounts: boolean;
    sorted: Array<Sort>;
    skip: number;
    take: number;
    where: [
        {
            isComplex: boolean;
            ignoreCase: boolean;
            ignoreAccent: boolean;
            condition: 'and' | 'or';
            predicates: Array<Predicates>;
        },
    ];
}
