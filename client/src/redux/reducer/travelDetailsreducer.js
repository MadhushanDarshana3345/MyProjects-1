import { createSlice } from "@reduxjs/toolkit";

export const travelDetailsSlice = createSlice({
    name:"travelDetails",
    initialState:{value:{numberOfBooking:""}},
    reducers:{
        Booking:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export default travelDetailsSlice.reducer;