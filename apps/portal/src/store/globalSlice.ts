import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface GlobalState {
  userName: string
  token: string
  userEmail: string
  msgPilotLanguage: string
}

const initialState: GlobalState = {
  userName: window.localStorage.getItem('msg-pilot-jwt-userName') || '',
  token: window.localStorage.getItem('msg-pilot-jwt-token') || '',
  userEmail: window.localStorage.getItem('msg-pilot-jwt-userEmail') || '',
  msgPilotLanguage: window.localStorage.getItem('msg-pilot-language') || 'en',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
      window.localStorage.setItem('msg-pilot-jwt-userName', state.userName)
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      window.localStorage.setItem('msg-pilot-jwt-token', state.token)
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload
      window.localStorage.setItem('msg-pilot-jwt-userEmail', state.userEmail)
    },
    updateMsgPilotLanguage: (state, action: PayloadAction<string>) => {
      state.msgPilotLanguage = action.payload
      window.localStorage.setItem('msg-pilot-language', state.msgPilotLanguage)
    },
  },
})

export const {
  updateUserName,
  updateToken,
  updateUserEmail,
  updateMsgPilotLanguage,
} = globalSlice.actions

export default globalSlice.reducer
