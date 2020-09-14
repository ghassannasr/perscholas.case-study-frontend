const initialData = {
  items: {
      'item-1': { id: 'item-1', content: 'cucumbers'},
      'item-2': { id: 'item-2', content: 'parsley'},
      'item-3': { id: 'item-3', content: 'olive oil'},
      'item-4': { id: 'item-4', content: 'pizza dough'},
  },
  lists: {
      'list-1': {
          id: 'list-1',
          title: 'Past Items',
          itemIds: ['item-1', 'item-2', 'item-3', 'item-4'],
      },
      'list-2': {
        id: 'list-2',
        title: 'Create List',
        itemIds: [],
    },

  },
  listOrder: ['list-1', 'list-2'],
};

export default initialData;