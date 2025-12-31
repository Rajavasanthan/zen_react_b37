import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      return state;
    },
    createUser: (state, action) => {
      state.users = [...state.users, action.payload];
      return state;
    },
  },
});

export const { setUsers, createUser } = userSlice.actions;
