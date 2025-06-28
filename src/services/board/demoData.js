const demoData = [
  {
    _id: "ezqlrbr8",
    title: "Monday - Sprint 4 - Design Approval",
    description: "Sprint demo",
    type: "Tasks",
    style: {
      backgroundImgs: []
    },
    isStarred: false,
    createdBy: "u101",
    archivedAt: null,
    members: [],
    labels: [],
    activities: [],
    columns: [
      {
        id: "7zvbe0u8",
        name: "Item",
        width: 400,
        createdAt: 1750509436612,
        createdBy: "u101",
        type: { variant: "item" }
      },
      {
        id: "tiosg2oa",
        name: "Person",
        width: 200,
        createdAt: 1750509436612,
        createdBy: "u101",
        type: { variant: "people" }
      },
      {
        id: "z5hdyumj",
        name: "Status",
        width: 200,
        createdAt: 1750509436612,
        createdBy: "u101",
        type: {
          variant: "status",
          labels: [
            {
              id: "zbq5wrkd",
              name: "Working on it",
              color: "working_orange"
            },
            {
              id: "koa0dsml",
              name: "Done",
              color: "done-green",
              isHappyLabel: true
            }
          ]
        }
      },
      {
        id: "fbudltun",
        name: "Date",
        width: 200,
        createdAt: 1750509436612,
        createdBy: "u101",
        type: { variant: "date" }
      }
    ],
    groups: [
      {
        id: "0lvoosu5",
        title: "Frontend",
        color: "purple",
        isCollapsed: false,
        tasks: [
          {
            id: "8lbzfeet",
            createdAt: 1750509436612,
            createdBy: "u101",
            updates: [],
            files: [],
            columnValues: [
              {
                colId: "7zvbe0u8",
                value: "Implement Task Preview UI 2"
              },
              {
                colId: "tiosg2oa",
                value: ["John"]
              },
              {
                colId: "z5hdyumj",
                value: "zbq5wrkd"
              },
              {
                colId: "fbudltun",
                value: 1748217600000
              }
            ]
          }
        ]
      },
      {
        id: "9wl6pbvu",
        title: "Backend",
        color: "bright-blue",
        isCollapsed: false,
        tasks: [
          {
            id: "crxa1f7p",
            createdAt: 1750509436613,
            createdBy: "u101",
            updates: [],
            files: [],
            columnValues: [
              {
                colId: "7zvbe0u8",
                value: "Set up Express server"
              },
              {
                colId: "tiosg2oa",
                value: ["SS"]
              },
              {
                colId: "z5hdyumj",
                value: "zbq5wrkd"
              },
              {
                colId: "fbudltun",
                value: 1748563200000
              }
            ]
          }
        ]
      }
    ]
  }
]

export default demoData