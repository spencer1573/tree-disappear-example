export const dataOne = [
  {
    text: 'Item 1',
    displayText: 'Item 1',
    data: { icon: 1, id: 1 },
  },
  {
    text: 'Item 2',
    displayText: 'Item 2',
    data: { icon: 2, id: 2 },
  },
  {
    text: 'Item 3',
    displayText: 'Item 2',
    data: { icon: 3, id: 3 },
    state: { expanded: true, selected: false, checked: true },
    children: [
      {
        text: 'Item 3.1',
        displayText: 'Item 3.1',
        data: { icon: 31, id: 31 },
      },
      {
        text: 'Item 3.2',
        displayText: 'Item 3.2',
        data: { icon: 32, id: 32 },
      },
    ],
  },
]
