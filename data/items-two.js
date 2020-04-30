export const dataTwo = [
  {
    text: 'Item 1', 
    id: 1
  },
  {
    text: 'Item 2',
    id: 2
  },
  {
    text: 'Item 3',
    id: 3,
    state: { expanded: true, selected: false, checked: true },
    children: [
      {
        text: 'Item 3.1',
        id: 31,
        children: [
          {
            text: 'Item 3.10',
            id: 310 
          },
          {
            text: 'Item 3.11',
            id: 310 
          },
        ]
      },
      {
        text: 'Item 3.2',
        id: 32
      }
    ]
  }
]
