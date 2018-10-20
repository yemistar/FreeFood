const initialState = {
    emails: {
      data: [],
      lastSynced: null
    }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'CACHE_EMAILS':
      return {
        ...state,
        emails: {
          data: action.data,
          lastSynced: new Date()
        }
      }
    default:
      return state;
  }
};
