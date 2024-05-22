import {createSlice} from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {value: false},
    reducers: {
        setLogin: (state) => {
            state.value = true;
        },
        setLogout: (state) => {
            state.value = false;
        }
    },
});

export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer;