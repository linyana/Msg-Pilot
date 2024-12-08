import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface GlobalState {
  userName: string
  token: string
  userEmail: string
  autoSendMessageLanguage: string
  userId:string
  merchant_id: string
}

const initialState: GlobalState = {
  userName: window.localStorage.getItem('auto-send-message-jwt-userName') || '',
  token: window.localStorage.getItem('auto-send-message-jwt-token') || '',
  userEmail: window.localStorage.getItem('auto-send-message-jwt-userEmail') || '',
  autoSendMessageLanguage: window.localStorage.getItem('auto-send-message-language') || 'en',
  userId: window.localStorage.getItem('auto-send-message-jwr-userId') || '',
  merchant_id: window.localStorage.getItem('auto-send-message-merchant-id') || '',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
      window.localStorage.setItem('auto-send-message-jwr-userId', state.userId)
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
      window.localStorage.setItem('auto-send-message-jwt-userName', state.userName)
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      window.localStorage.setItem('auto-send-message-jwt-token', state.token)
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload
      window.localStorage.setItem('auto-send-message-jwt-userEmail', state.userEmail)
    },
    updateAutoSendMessageLanguage: (state, action: PayloadAction<string>) => {
      state.autoSendMessageLanguage = action.payload
      window.localStorage.setItem('auto-send-message-language', state.autoSendMessageLanguage)
    },
  },
})

export const {
  updateUserName,
  updateToken,
  updateUserEmail,
  updateAutoSendMessageLanguage,
  updateUserId,
} = globalSlice.actions

export default globalSlice.reducer
