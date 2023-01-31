import { createSlice, configureStore } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: []
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({ type: action.payload.type, message: action.payload.message })
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
})

export const { addNotification, clearNotifications } = notificationSlice.actions

export const notificationStore = configureStore({
  reducer: notificationSlice.reducer
});
