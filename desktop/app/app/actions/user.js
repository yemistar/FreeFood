export const login = (data) => {
  return {
    type: 'LOGIN',
    data
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const createAccount = (data) => {
  return {
    type: 'CREATE_ACCOUNT',
    data
  }
}

export const activate = () => {
  return {
    type: 'ACTIVATE',
  }
}

export const refreshFriends = (friends) => {
  return {
    type: 'REFRESH_FRIENDS',
    data: friends
  }
}

export const refreshWallet = (wallet) => {
  return {
    type: 'REFRESH_WALLET',
    data: wallet
  }
}

export const refreshPending = (pending) => {
  return {
    type: 'REFRESH_PENDING',
    data: pending
  }
}

export const refreshNotifications = (notifications) => {
  return {
    type: 'REFRESH_NOTIFICATIONS',
    data: notifications
  }
}
