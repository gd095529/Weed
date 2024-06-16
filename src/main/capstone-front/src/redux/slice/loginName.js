import {createSlice} from "@reduxjs/toolkit";

const loginIDSlice = createSlice({
    name: 'loginID',
    initialState: {value: ''},
    reducers: {
        loginName: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { loginName } = loginIDSlice.actions;
export default loginIDSlice.reducer;