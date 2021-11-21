import { configureStore } from '@reduxjs/toolkit'
import campaignFormReducer from './reducers/campaignFormReducer'
import loginReducer from './reducers/loginReducer'


export default configureStore({
  reducer: {
	  login: loginReducer,
	  campaignForm: campaignFormReducer
  },
})