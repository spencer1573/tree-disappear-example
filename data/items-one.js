export const dataOne = [
  {
    text: 'Item 1',
    data: { id: 1 },
  },
  {
    text: 'Item 2',
    data: { id: 2 },
  },
  {
    text: 'Item 3',
    data: { id: 3 },
    state: { expanded: true, selected: false, checked: true },
    children: [
      {
        text: 'Item 3.1',
        data: { id: 31 },
      },
      {
        text: 'Item 3.2',
        data: { id: 32 },
      },
    ],
  },
]
