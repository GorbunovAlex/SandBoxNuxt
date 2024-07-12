export default defineEventHandler((event) => {
    return [
        {
            'field': 'climate',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Climate',
                'de': 'Klima',
            },
            'name_short': {
                'en': 'CL',
                'de': 'KL',
            },
        },
        {
            'field': 'diameter',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Diameter',
                'de': 'Durchmesser',
            },
            'name_short': {
                'en': 'DI',
                'de': 'DR',
            },
        },
        {
            'field': 'gravity',
            'data_type': 'numeric',
            'is_visible': true,
            'name_long': {
                'en': 'Gravity',
                'de': 'Gravitationsbeschaffenheit',
            },
            'name_short': {
                'en': 'GE',
                'de': 'GB',
            },
        },
        {
            'field': 'name',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Name',
                'de': 'Name',
            },
            'name_short': {
                'en': 'N',
                'de': 'N',
            },
        },
        {
            'field': 'orbital_period',
            'data_type': 'numeric',
            'is_visible': true,
            'name_long': {
                'en': 'Orbital Period',
                'de': 'Orbitalzeit',
            },
            'name_short': {
                'en': 'OP',
                'de': 'OZ',
            },
        },
        {
            'field': 'population',
            'data_type': 'numeric',
            'is_visible': true,
            'name_long': {
                'en': 'Population',
                'de': 'Bevoelkerung',
            },
            'name_short': {
                'en': 'PO',
                'de': 'BE',
            },
        },
        {
            'field': 'rotation_period',
            'data_type': 'numeric',
            'is_visible': true,
            'name_long': {
                'en': 'Rotation Period',
                'de': 'Rotationszeit',
            },
            'name_short': {
                'en': 'RP',
                'de': 'RZ',
            },
        },
        {
            'field': 'surface_water',
            'data_type': 'numeric',
            'is_visible': true,
            'name_long': {
                'en': 'Surface Water',
                'de': 'Überschwemmung',
            },
            'name_short': {
                'en': 'SW',
                'de': 'UE',
            },
        },
        {
            'field': 'terrain',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Terrain',
                'de': 'Boden',
            },
            'name_short': {
                'en': 'T',
                'de': 'B',
            },
        },
        {
            'field': 'created',
            'data_type': 'datetime',
            'is_visible': true,
            'name_long': {
                'en': 'Created',
                'de': 'Erstellt',
            },
            'name_short': {
                'en': 'C',
                'de': 'E',
            },
        },
        {
            'field': 'edited',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Edited',
                'de': 'Bearbeitet',
            },
            'name_short': {
                'en': 'E',
                'de': 'B',
            },
        },
    ]
})