export interface ITimeZone {
    id: number;
    displayName: string;
    name: string;
    offsetMinutes: number;
}

export class TimeZones {
    public static zones: ITimeZone[]  = [
        {
            offsetMinutes:  -720,
            name:  'Dateline Standard Time',
            id:  1,
            displayName:  '(UTC-12:00) International Date Line West'
        },
        {
            offsetMinutes:  -660,
            name:  'UTC-11',
            id:  2,
            displayName:  '(UTC-11:00) Coordinated Universal Time-11'
        },
        {
            offsetMinutes:  -600,
            name:  'Aleutian Standard Time',
            id:  3,
            displayName:  '(UTC-10:00) Aleutian Islands'
        },
        {
            offsetMinutes:  -600,
            name:  'Hawaiian Standard Time',
            id:  4,
            displayName:  '(UTC-10:00) Hawaii'
        },
        {
            offsetMinutes:  -570,
            name:  'Marquesas Standard Time',
            id:  5,
            displayName:  '(UTC-09:30) Marquesas Islands'
        },
        {
            offsetMinutes:  -540,
            name:  'Alaskan Standard Time',
            id:  6,
            displayName:  '(UTC-09:00) Alaska'
        },
        {
            offsetMinutes:  -540,
            name:  'UTC-09',
            id:  7,
            displayName:  '(UTC-09:00) Coordinated Universal Time-09'
        },
        {
            offsetMinutes:  -480,
            name:  'Pacific Standard Time (Mexico)',
            id:  8,
            displayName:  '(UTC-08:00) Baja California'
        },
        {
            offsetMinutes:  -480,
            name:  'UTC-08',
            id:  9,
            displayName:  '(UTC-08:00) Coordinated Universal Time-08'
        },
        {
            offsetMinutes:  -480,
            name:  'Pacific Standard Time',
            id:  10,
            displayName:  '(UTC-08:00) Pacific Time (US \u0026 Canada)'
        },
        {
            offsetMinutes:  -420,
            name:  'US Mountain Standard Time',
            id:  11,
            displayName:  '(UTC-07:00) Arizona'
        },
        {
            offsetMinutes:  -420,
            name:  'Mountain Standard Time (Mexico)',
            id:  12,
            displayName:  '(UTC-07:00) Chihuahua, La Paz, Mazatlan'
        },
        {
            offsetMinutes:  -420,
            name:  'Mountain Standard Time',
            id:  13,
            displayName:  '(UTC-07:00) Mountain Time (US \u0026 Canada)'
        },
        {
            offsetMinutes:  -360,
            name:  'Central America Standard Time',
            id:  14,
            displayName:  '(UTC-06:00) Central America'
        },
        {
            offsetMinutes:  -360,
            name:  'Central Standard Time',
            id:  15,
            displayName:  '(UTC-06:00) Central Time (US \u0026 Canada)'
        },
        {
            offsetMinutes:  -360,
            name:  'Easter Island Standard Time',
            id:  16,
            displayName:  '(UTC-06:00) Easter Island'
        },
        {
            offsetMinutes:  -360,
            name:  'Central Standard Time (Mexico)',
            id:  17,
            displayName:  '(UTC-06:00) Guadalajara, Mexico City, Monterrey'
        },
        {
            offsetMinutes:  -360,
            name:  'Canada Central Standard Time',
            id:  18,
            displayName:  '(UTC-06:00) Saskatchewan'
        },
        {
            offsetMinutes:  -300,
            name:  'SA Pacific Standard Time',
            id:  19,
            displayName:  '(UTC-05:00) Bogota, Lima, Quito, Rio Branco'
        },
        {
            offsetMinutes:  -300,
            name:  'Eastern Standard Time (Mexico)',
            id:  20,
            displayName:  '(UTC-05:00) Chetumal'
        },
        {
            offsetMinutes:  -300,
            name:  'Eastern Standard Time',
            id:  21,
            displayName:  '(UTC-05:00) Eastern Time (US \u0026 Canada)'
        },
        {
            offsetMinutes:  -300,
            name:  'Haiti Standard Time',
            id:  22,
            displayName:  '(UTC-05:00) Haiti'
        },
        {
            offsetMinutes:  -300,
            name:  'Cuba Standard Time',
            id:  23,
            displayName:  '(UTC-05:00) Havana'
        },
        {
            offsetMinutes:  -300,
            name:  'US Eastern Standard Time',
            id:  24,
            displayName:  '(UTC-05:00) Indiana (East)'
        },
        {
            offsetMinutes:  -300,
            name:  'Turks And Caicos Standard Time',
            id:  25,
            displayName:  '(UTC-05:00) Turks and Caicos'
        },
        {
            offsetMinutes:  -240,
            name:  'Paraguay Standard Time',
            id:  26,
            displayName:  '(UTC-04:00) Asuncion'
        },
        {
            offsetMinutes:  -240,
            name:  'Atlantic Standard Time',
            id:  27,
            displayName:  '(UTC-04:00) Atlantic Time (Canada)'
        },
        {
            offsetMinutes:  -240,
            name:  'Venezuela Standard Time',
            id:  28,
            displayName:  '(UTC-04:00) Caracas'
        },
        {
            offsetMinutes:  -240,
            name:  'Central Brazilian Standard Time',
            id:  29,
            displayName:  '(UTC-04:00) Cuiaba'
        },
        {
            offsetMinutes:  -240,
            name:  'SA Western Standard Time',
            id:  30,
            displayName:  '(UTC-04:00) Georgetown, La Paz, Manaus, San Juan'
        },
        {
            offsetMinutes:  -240,
            name:  'Pacific SA Standard Time',
            id:  31,
            displayName:  '(UTC-04:00) Santiago'
        },
        {
            offsetMinutes:  -210,
            name:  'Newfoundland Standard Time',
            id:  32,
            displayName:  '(UTC-03:30) Newfoundland'
        },
        {
            offsetMinutes:  -180,
            name:  'Tocantins Standard Time',
            id:  33,
            displayName:  '(UTC-03:00) Araguaina'
        },
        {
            offsetMinutes:  -180,
            name:  'E. South America Standard Time',
            id:  34,
            displayName:  '(UTC-03:00) Brasilia'
        },
        {
            offsetMinutes:  -180,
            name:  'SA Eastern Standard Time',
            id:  35,
            displayName:  '(UTC-03:00) Cayenne, Fortaleza'
        },
        {
            offsetMinutes:  -180,
            name:  'Argentina Standard Time',
            id:  36,
            displayName:  '(UTC-03:00) City of Buenos Aires'
        },
        {
            offsetMinutes:  -180,
            name:  'Greenland Standard Time',
            id:  37,
            displayName:  '(UTC-03:00) Greenland'
        },
        {
            offsetMinutes:  -180,
            name:  'Montevideo Standard Time',
            id:  38,
            displayName:  '(UTC-03:00) Montevideo'
        },
        {
            offsetMinutes:  -180,
            name:  'Magallanes Standard Time',
            id:  39,
            displayName:  '(UTC-03:00) Punta Arenas'
        },
        {
            offsetMinutes:  -180,
            name:  'Saint Pierre Standard Time',
            id:  40,
            displayName:  '(UTC-03:00) Saint Pierre and Miquelon'
        },
        {
            offsetMinutes:  -180,
            name:  'Bahia Standard Time',
            id:  41,
            displayName:  '(UTC-03:00) Salvador'
        },
        {
            offsetMinutes:  -120,
            name:  'UTC-02',
            id:  42,
            displayName:  '(UTC-02:00) Coordinated Universal Time-02'
        },
        {
            offsetMinutes:  -120,
            name:  'Mid-Atlantic Standard Time',
            id:  43,
            displayName:  '(UTC-02:00) Mid-Atlantic - Old'
        },
        {
            offsetMinutes:  -60,
            name:  'Azores Standard Time',
            id:  44,
            displayName:  '(UTC-01:00) Azores'
        },
        {
            offsetMinutes:  -60,
            name:  'Cape Verde Standard Time',
            id:  45,
            displayName:  '(UTC-01:00) Cabo Verde Is.'
        },
        {
            offsetMinutes:  0,
            name:  'UTC',
            id:  46,
            displayName:  '(UTC) Coordinated Universal Time'
        },
        {
            offsetMinutes:  0,
            name:  'Morocco Standard Time',
            id:  47,
            displayName:  '(UTC+00:00) Casablanca'
        },
        {
            offsetMinutes:  0,
            name:  'GMT Standard Time',
            id:  48,
            displayName:  '(UTC+00:00) Dublin, Edinburgh, Lisbon, London'
        },
        {
            offsetMinutes:  0,
            name:  'Greenwich Standard Time',
            id:  49,
            displayName:  '(UTC+00:00) Monrovia, Reykjavik'
        },
        {
            offsetMinutes:  60,
            name:  'W. Europe Standard Time',
            id:  50,
            displayName:  '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'
        },
        {
            offsetMinutes:  60,
            name:  'Central Europe Standard Time',
            id:  51,
            displayName:  '(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague'
        },
        {
            offsetMinutes:  60,
            name:  'Romance Standard Time',
            id:  52,
            displayName:  '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris'
        },
        {
            offsetMinutes:  60,
            name:  'Central European Standard Time',
            id:  53,
            displayName:  '(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb'
        },
        {
            offsetMinutes:  60,
            name:  'W. Central Africa Standard Time',
            id:  54,
            displayName:  '(UTC+01:00) West Central Africa'
        },
        {
            offsetMinutes:  120,
            name:  'Jordan Standard Time',
            id:  55,
            displayName:  '(UTC+02:00) Amman'
        },
        {
            offsetMinutes:  120,
            name:  'GTB Standard Time',
            id:  56,
            displayName:  '(UTC+02:00) Athens, Bucharest'
        },
        {
            offsetMinutes:  120,
            name:  'Middle East Standard Time',
            id:  57,
            displayName:  '(UTC+02:00) Beirut'
        },
        {
            offsetMinutes:  120,
            name:  'Egypt Standard Time',
            id:  58,
            displayName:  '(UTC+02:00) Cairo'
        },
        {
            offsetMinutes:  120,
            name:  'E. Europe Standard Time',
            id:  59,
            displayName:  '(UTC+02:00) Chisinau'
        },
        {
            offsetMinutes:  120,
            name:  'Syria Standard Time',
            id:  60,
            displayName:  '(UTC+02:00) Damascus'
        },
        {
            offsetMinutes:  120,
            name:  'West Bank Standard Time',
            id:  61,
            displayName:  '(UTC+02:00) Gaza, Hebron'
        },
        {
            offsetMinutes:  120,
            name:  'South Africa Standard Time',
            id:  62,
            displayName:  '(UTC+02:00) Harare, Pretoria'
        },
        {
            offsetMinutes:  120,
            name:  'FLE Standard Time',
            id:  63,
            displayName:  '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius'
        },
        {
            offsetMinutes:  120,
            name:  'Israel Standard Time',
            id:  64,
            displayName:  '(UTC+02:00) Jerusalem'
        },
        {
            offsetMinutes:  120,
            name:  'Kaliningrad Standard Time',
            id:  65,
            displayName:  '(UTC+02:00) Kaliningrad'
        },
        {
            offsetMinutes:  120,
            name:  'Sudan Standard Time',
            id:  66,
            displayName:  '(UTC+02:00) Khartoum'
        },
        {
            offsetMinutes:  120,
            name:  'Libya Standard Time',
            id:  67,
            displayName:  '(UTC+02:00) Tripoli'
        },
        {
            offsetMinutes:  120,
            name:  'Namibia Standard Time',
            id:  68,
            displayName:  '(UTC+02:00) Windhoek'
        },
        {
            offsetMinutes:  180,
            name:  'Arabic Standard Time',
            id:  69,
            displayName:  '(UTC+03:00) Baghdad'
        },
        {
            offsetMinutes:  180,
            name:  'Turkey Standard Time',
            id:  70,
            displayName:  '(UTC+03:00) Istanbul'
        },
        {
            offsetMinutes:  180,
            name:  'Arab Standard Time',
            id:  71,
            displayName:  '(UTC+03:00) Kuwait, Riyadh'
        },
        {
            offsetMinutes:  180,
            name:  'Belarus Standard Time',
            id:  72,
            displayName:  '(UTC+03:00) Minsk'
        },
        {
            offsetMinutes:  180,
            name:  'Russian Standard Time',
            id:  73,
            displayName:  '(UTC+03:00) Moscow, St. Petersburg, Volgograd'
        },
        {
            offsetMinutes:  180,
            name:  'E. Africa Standard Time',
            id:  74,
            displayName:  '(UTC+03:00) Nairobi'
        },
        {
            offsetMinutes:  210,
            name:  'Iran Standard Time',
            id:  75,
            displayName:  '(UTC+03:30) Tehran'
        },
        {
            offsetMinutes:  240,
            name:  'Arabian Standard Time',
            id:  76,
            displayName:  '(UTC+04:00) Abu Dhabi, Muscat'
        },
        {
            offsetMinutes:  240,
            name:  'Astrakhan Standard Time',
            id:  77,
            displayName:  '(UTC+04:00) Astrakhan, Ulyanovsk'
        },
        {
            offsetMinutes:  240,
            name:  'Azerbaijan Standard Time',
            id:  78,
            displayName:  '(UTC+04:00) Baku'
        },
        {
            offsetMinutes:  240,
            name:  'Russia Time Zone 3',
            id:  79,
            displayName:  '(UTC+04:00) Izhevsk, Samara'
        },
        {
            offsetMinutes:  240,
            name:  'Mauritius Standard Time',
            id:  80,
            displayName:  '(UTC+04:00) Port Louis'
        },
        {
            offsetMinutes:  240,
            name:  'Saratov Standard Time',
            id:  81,
            displayName:  '(UTC+04:00) Saratov'
        },
        {
            offsetMinutes:  240,
            name:  'Georgian Standard Time',
            id:  82,
            displayName:  '(UTC+04:00) Tbilisi'
        },
        {
            offsetMinutes:  240,
            name:  'Caucasus Standard Time',
            id:  83,
            displayName:  '(UTC+04:00) Yerevan'
        },
        {
            offsetMinutes:  270,
            name:  'Afghanistan Standard Time',
            id:  84,
            displayName:  '(UTC+04:30) Kabul'
        },
        {
            offsetMinutes:  300,
            name:  'West Asia Standard Time',
            id:  85,
            displayName:  '(UTC+05:00) Ashgabat, Tashkent'
        },
        {
            offsetMinutes:  300,
            name:  'Ekaterinburg Standard Time',
            id:  86,
            displayName:  '(UTC+05:00) Ekaterinburg'
        },
        {
            offsetMinutes:  300,
            name:  'Pakistan Standard Time',
            id:  87,
            displayName:  '(UTC+05:00) Islamabad, Karachi'
        },
        {
            offsetMinutes:  330,
            name:  'India Standard Time',
            id:  88,
            displayName:  '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi'
        },
        {
            offsetMinutes:  330,
            name:  'Sri Lanka Standard Time',
            id:  89,
            displayName:  '(UTC+05:30) Sri Jayawardenepura'
        },
        {
            offsetMinutes:  345,
            name:  'Nepal Standard Time',
            id:  90,
            displayName:  '(UTC+05:45) Kathmandu'
        },
        {
            offsetMinutes:  360,
            name:  'Central Asia Standard Time',
            id:  91,
            displayName:  '(UTC+06:00) Astana'
        },
        {
            offsetMinutes:  360,
            name:  'Bangladesh Standard Time',
            id:  92,
            displayName:  '(UTC+06:00) Dhaka'
        },
        {
            offsetMinutes:  360,
            name:  'Omsk Standard Time',
            id:  93,
            displayName:  '(UTC+06:00) Omsk'
        },
        {
            offsetMinutes:  390,
            name:  'Myanmar Standard Time',
            id:  94,
            displayName:  '(UTC+06:30) Yangon (Rangoon)'
        },
        {
            offsetMinutes:  420,
            name:  'SE Asia Standard Time',
            id:  95,
            displayName:  '(UTC+07:00) Bangkok, Hanoi, Jakarta'
        },
        {
            offsetMinutes:  420,
            name:  'Altai Standard Time',
            id:  96,
            displayName:  '(UTC+07:00) Barnaul, Gorno-Altaysk'
        },
        {
            offsetMinutes:  420,
            name:  'W. Mongolia Standard Time',
            id:  97,
            displayName:  '(UTC+07:00) Hovd'
        },
        {
            offsetMinutes:  420,
            name:  'North Asia Standard Time',
            id:  98,
            displayName:  '(UTC+07:00) Krasnoyarsk'
        },
        {
            offsetMinutes:  420,
            name:  'N. Central Asia Standard Time',
            id:  99,
            displayName:  '(UTC+07:00) Novosibirsk'
        },
        {
            offsetMinutes:  420,
            name:  'Tomsk Standard Time',
            id:  100,
            displayName:  '(UTC+07:00) Tomsk'
        },
        {
            offsetMinutes:  480,
            name:  'China Standard Time',
            id:  101,
            displayName:  '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi'
        },
        {
            offsetMinutes:  480,
            name:  'North Asia East Standard Time',
            id:  102,
            displayName:  '(UTC+08:00) Irkutsk'
        },
        {
            offsetMinutes:  480,
            name:  'Singapore Standard Time',
            id:  103,
            displayName:  '(UTC+08:00) Kuala Lumpur, Singapore'
        },
        {
            offsetMinutes:  480,
            name:  'W. Australia Standard Time',
            id:  104,
            displayName:  '(UTC+08:00) Perth'
        },
        {
            offsetMinutes:  480,
            name:  'Taipei Standard Time',
            id:  105,
            displayName:  '(UTC+08:00) Taipei'
        },
        {
            offsetMinutes:  480,
            name:  'Ulaanbaatar Standard Time',
            id:  106,
            displayName:  '(UTC+08:00) Ulaanbaatar'
        },
        {
            offsetMinutes:  510,
            name:  'North Korea Standard Time',
            id:  107,
            displayName:  '(UTC+08:30) Pyongyang'
        },
        {
            offsetMinutes:  525,
            name:  'Aus Central W. Standard Time',
            id:  108,
            displayName:  '(UTC+08:45) Eucla'
        },
        {
            offsetMinutes:  540,
            name:  'Transbaikal Standard Time',
            id:  109,
            displayName:  '(UTC+09:00) Chita'
        },
        {
            offsetMinutes:  540,
            name:  'Tokyo Standard Time',
            id:  110,
            displayName:  '(UTC+09:00) Osaka, Sapporo, Tokyo'
        },
        {
            offsetMinutes:  540,
            name:  'Korea Standard Time',
            id:  111,
            displayName:  '(UTC+09:00) Seoul'
        },
        {
            offsetMinutes:  540,
            name:  'Yakutsk Standard Time',
            id:  112,
            displayName:  '(UTC+09:00) Yakutsk'
        },
        {
            offsetMinutes:  570,
            name:  'Cen. Australia Standard Time',
            id:  113,
            displayName:  '(UTC+09:30) Adelaide'
        },
        {
            offsetMinutes:  570,
            name:  'AUS Central Standard Time',
            id:  114,
            displayName:  '(UTC+09:30) Darwin'
        },
        {
            offsetMinutes:  600,
            name:  'E. Australia Standard Time',
            id:  115,
            displayName:  '(UTC+10:00) Brisbane'
        },
        {
            offsetMinutes:  600,
            name:  'AUS Eastern Standard Time',
            id:  116,
            displayName:  '(UTC+10:00) Canberra, Melbourne, Sydney'
        },
        {
            offsetMinutes:  600,
            name:  'West Pacific Standard Time',
            id:  117,
            displayName:  '(UTC+10:00) Guam, Port Moresby'
        },
        {
            offsetMinutes:  600,
            name:  'Tasmania Standard Time',
            id:  118,
            displayName:  '(UTC+10:00) Hobart'
        },
        {
            offsetMinutes:  600,
            name:  'Vladivostok Standard Time',
            id:  119,
            displayName:  '(UTC+10:00) Vladivostok'
        },
        {
            offsetMinutes:  630,
            name:  'Lord Howe Standard Time',
            id:  120,
            displayName:  '(UTC+10:30) Lord Howe Island'
        },
        {
            offsetMinutes:  660,
            name:  'Bougainville Standard Time',
            id:  121,
            displayName:  '(UTC+11:00) Bougainville Island'
        },
        {
            offsetMinutes:  660,
            name:  'Russia Time Zone 10',
            id:  122,
            displayName:  '(UTC+11:00) Chokurdakh'
        },
        {
            offsetMinutes:  660,
            name:  'Magadan Standard Time',
            id:  123,
            displayName:  '(UTC+11:00) Magadan'
        },
        {
            offsetMinutes:  660,
            name:  'Norfolk Standard Time',
            id:  124,
            displayName:  '(UTC+11:00) Norfolk Island'
        },
        {
            offsetMinutes:  660,
            name:  'Sakhalin Standard Time',
            id:  125,
            displayName:  '(UTC+11:00) Sakhalin'
        },
        {
            offsetMinutes:  660,
            name:  'Central Pacific Standard Time',
            id:  126,
            displayName:  '(UTC+11:00) Solomon Is., New Caledonia'
        },
        {
            offsetMinutes:  720,
            name:  'Russia Time Zone 11',
            id:  127,
            displayName:  '(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky'
        },
        {
            offsetMinutes:  720,
            name:  'New Zealand Standard Time',
            id:  128,
            displayName:  '(UTC+12:00) Auckland, Wellington'
        },
        {
            offsetMinutes:  720,
            name:  'UTC+12',
            id:  129,
            displayName:  '(UTC+12:00) Coordinated Universal Time+12'
        },
        {
            offsetMinutes:  720,
            name:  'Fiji Standard Time',
            id:  130,
            displayName:  '(UTC+12:00) Fiji'
        },
        {
            offsetMinutes:  720,
            name:  'Kamchatka Standard Time',
            id:  131,
            displayName:  '(UTC+12:00) Petropavlovsk-Kamchatsky - Old'
        },
        {
            offsetMinutes:  765,
            name:  'Chatham Islands Standard Time',
            id:  132,
            displayName:  '(UTC+12:45) Chatham Islands'
        },
        {
            offsetMinutes:  780,
            name:  'UTC+13',
            id:  133,
            displayName:  '(UTC+13:00) Coordinated Universal Time+13'
        },
        {
            offsetMinutes:  780,
            name:  'Tonga Standard Time',
            id:  134,
            displayName:  '(UTC+13:00) Nuku\u0027alofa'
        },
        {
            offsetMinutes:  780,
            name:  'Samoa Standard Time',
            id:  135,
            displayName:  '(UTC+13:00) Samoa'
        },
        {
            offsetMinutes:  840,
            name:  'Line Islands Standard Time',
            id:  136,
            displayName:  '(UTC+14:00) Kiritimati Island'
        }
    ];
}
