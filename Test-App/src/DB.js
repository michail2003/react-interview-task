const JobSite = [
    {
        jobsite_name: "95-01 Linden Blvd, Jamaica, NY 11417, USA",
        categories: ["Sidewalk Shed", "Shoring"],
        status: "On Hold_red",
        updated_items: [
            {
                id: 1,
                quantity_updated: 15
            }
        ]
    },

    {
        jobsite_name: "1658 E 23rd St, Brooklyn, NY 11229, USA",
        categories: ["Shoring"],
        status: "On Hold",
        updated_items: [
            {
                id: 18,
                description_updated: 'that item can be update indipendetly'
            }
        ]
    },

    {
        jobsite_name: "1329 56th St, Brooklyn, NY 11219, USA",
        categories: ["Sidewalk Shed"],
        status: "In Progress",
        updated_items: [
            {
                id: 1,
                notes_updated: "notes are editable too"
            }
        ]
    },
    {
        jobsite_name: "200 Newport St, Brooklyn, NY 11212, USA",
        categories: ["Sidewalk Shed", "Shoring","Scaffold"],
        status: "Completed",
        updated_items: [
            {
                id: 12,
                quantity_updated: 100
            }
        ]
    }
]




const Categories = [
    {
        category_name: "Sidewalk Shed",
        items: [
            {
                id: 1,
                item_name: "G42295",
                default_quantity: 10,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 2,
                item_name: "M721",
                default_quantity: 83,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 3,
                item_name: "M94796",
                default_quantity: 31,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 4,
                item_name: "S25907",
                default_quantity: 47,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 5,
                item_name: "A68446",
                default_quantity: 52,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 6,
                item_name: "F3786",
                default_quantity: 10,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 7,
                item_name: "R69895",
                default_quantity: 30,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 8,
                item_name: "A29259",
                default_quantity: 32,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 9,
                item_name: "A41878",
                default_quantity: 16,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 10,
                item_name: "A37244",
                default_quantity: 13,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 11,
                item_name: "M89319",
                default_quantity: 10,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            }
        ]
    },
    {
        category_name: "Scaffold",
        items: [
            {
                id: 12,
                item_name: "PA948Z",
                default_quantity: 25,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 13,
                item_name: "ZT973V",
                default_quantity: 83,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 14,
                item_name: "RB948D",
                default_quantity: 31,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 15,
                item_name: "B52007",
                default_quantity: 10,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 16,
                item_name: "F16244",
                default_quantity: 13,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 17,
                item_name: "J0975X",
                default_quantity: 45,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            }
        ],
    },
    {
        category_name: "Shoring",
        items: [
            {
                id: 18,
                item_name: "S6342Y",
                default_quantity: 55,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 19,
                item_name: "H1234X",
                default_quantity: 23,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            },
            {
                id: 20,
                item_name: "D5678Z",
                default_quantity: 78,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum.",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum."
            }
        ]

    }
]

export { JobSite, Categories };