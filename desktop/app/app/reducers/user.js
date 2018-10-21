const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  token: null,
  friends: [],
  pending: [],
  notifications: [],
  wallet: [],
  activated: false
};

export default home = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
      return {
        ...state,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        username: action.data.username,
        email: action.data.email,
      }
    case 'ACTIVATE':
      return {
        ...state,
        activated: true
      }
    case 'LOGIN':
      return {
        ...state,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        username: action.data.username,
        email: action.data.email,
        token: action.data.token
      }
    case 'LOGOUT':
      return {
        ...state,
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        token: null,
        friends: [],
        pending: [],
        notifications: [],
        wallet: [],
      }
    case 'REFRESH_FRIENDS':
      return {
        ...state,
        friends: action.data.map((f) => {
          let curn = state.wallet.find((w) => w.username === f.username)
          return { ...f, amount: curn ? curn.amount : 0 }
        })
      }
    case 'REFRESH_PENDING':
      return {
        ...state,
        pending: action.data
      }
    case 'REFRESH_WALLET':
      return {
        ...state,
        wallet: action.data
      }
    case 'REFRESH_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.data
      }
    default:
      return state;
  }
}
