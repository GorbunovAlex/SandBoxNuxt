export default defineEventHandler((event) => {
    return [
        {
            'field': 'director',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Director',
                'de': 'Regisseur',
            },
            'name_short': {
                'en': 'DR',
                'de': 'RD',
            },
        },
        {
            'field': 'episode_id',
            'data_type': 'numeric',
            'is_visible': true,
            'name_long': {
                'en': 'Episode ID',
                'de': 'Episoden-ID',
            },
            'name_short': {
                'en': 'EP',
                'de': 'EP',
            },
        },
        {
            'field': 'opening_crawl',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Opening Crawl',
                'de': 'Offenbarung',
            },
            'name_short': {
                'en': 'OC',
                'de': 'OB',
            },
        },
        {
            'field': 'producer',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Producer',
                'de': 'Verleger',
            },
            'name_short': {
                'en': 'PR',
                'de': 'VL',
            },
        },
        {
            'field': 'release_date',
            'data_type': 'date',
            'is_visible': true,
            'name_long': {
                'en': 'Release Date',
                'de': 'Veroeffentlichung',
            },
            'name_short': {
                'en': 'RD',
                'de': 'VD',
            },
        },
        {
            'field': 'title',
            'data_type': 'string',
            'is_visible': true,
            'name_long': {
                'en': 'Title',
                'de': 'Titel',
            },
            'name_short': {
                'en': 'T',
                'de': 'T',
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