import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface GlobalState {
  token: string
  user: {
    name?: string
    email?: string
  }
  language: string
}

const localStorageUser = JSON.parse(window.localStorage.getItem('msg-pilot-user') || '{}')

const initialState: GlobalState = {
  token: window.localStorage.getItem('msg-pilot-jwt-token') || '',
  user: {
    name: localStorageUser?.name || '',
    email: localStorageUser?.email || '',
  },
  language: window.localStorage.getItem('msg-pilot-language') || 'en',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      window.localStorage.setItem('msg-pilot-jwt-token', state.token)
    },
    updateUser: (state, action: PayloadAction<{name?: string, email?: string}>) => {
      state.user = action.payload
      window.localStorage.setItem('msg-pilot-user', JSON.stringify(state.user))
    },
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      window.localStorage.setItem('msg-pilot-language', state.language)
    },
  },
})

export const {
  updateUser,
  updateToken,
  updateLanguage,
} = globalSlice.actions

export default globalSlice.reducer
