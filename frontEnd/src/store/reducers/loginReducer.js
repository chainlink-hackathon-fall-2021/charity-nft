import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
	userId: ''
  },
  reducers: {

	login: (state, action) => {

		console.log(action)
		const user = action.payload
		console.log(user.get('username'))
		state.userId = action.payload
	},

	logout: (state) => {
		state.userId = ""
	}
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer