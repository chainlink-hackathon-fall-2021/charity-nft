import { createSlice } from '@reduxjs/toolkit'

// async function saveDataToIPFS(data) {
//   const {
//     error,
//     isUploading,
//     moralisFile,
//     saveFile,
//   } = useMoralisFile();

//   const file = new moralisFile("file.json", {base64 : btoa(JSON.stringify(data))});

//   const campaignData = await saveFile(file.name, file, { saveIPFS: true });
  
//   return campaignData
// }

export const campaignFormSlice = createSlice({
  name: 'counter',
  initialState: {
    formInput: {}
  },
  reducers: {

    formSubmit: async (state, action) => {

      console.log(action.payload)
      // const campaignData = await saveDataToIPFS(action.payload)
      // console.log(campaignData)
      
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const { formSubmit } = campaignFormSlice.actions

export default campaignFormSlice.reducer