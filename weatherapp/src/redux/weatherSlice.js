import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItems: localStorage.getItem("favlist")
    ? JSON.parse(localStorage.getItem("favlist"))
    : [],
  favid: localStorage.getItem("favid")
    ? JSON.parse(localStorage.getItem("favid"))
    : [],
  setvalue: false,
  recItems: localStorage.getItem("reclist")
    ? JSON.parse(localStorage.getItem("reclist"))
    : [],
};

const favSlice = createSlice({
  initialState,
  name: "weatherlist",
  reducers: {
    setAddItem: (state, action) => {
      const itemIndex = state.favItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
      } else {
        const temp = {
          ...action.payload,
        };

        state.favItems.push(temp);
        state.favid.push(action.payload.id);
      }
      localStorage.setItem("favlist", JSON.stringify(state.favItems));
      localStorage.setItem("favid", JSON.stringify(state.favid));
    },
    setRemoveItem: (state, action) => {
      const removeItem = state.favItems.filter(
        (item) => item.id !== action.payload.id
      );
      const removeId = state.favid.filter((item) => item !== action.payload.id);
      state.favItems = removeItem;
      state.favid = removeId;
      localStorage.setItem("favlist", JSON.stringify(state.favItems));
      localStorage.setItem("favid", JSON.stringify(state.favid));
    },
    setAddItemToRecent: (state, action) => {
      const itemIndex2 = state.recItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex2 >= 0) {
      } else {
        const temp = {
          ...action.payload,
        };

        state.recItems.push(temp);
        // state.favid.push(action.payload.id);
      }
      localStorage.setItem("reclist", JSON.stringify(state.recItems));
      // localStorage.setItem("favid", JSON.stringify(state.favid));
    },
    setrue: (state, action) => {
      state.setvalue = true;
    },
    clearItemsInFav: (state, action) => {
      state.favItems = [];
      state.favid = [];
      localStorage.setItem("favlist", JSON.stringify(state.favItems));
      localStorage.setItem("favid", JSON.stringify(state.favid));
    },
    clearItemsInRec: (state, action) => {
      state.recItems = [];
      localStorage.setItem("reclist", JSON.stringify(state.recItems));
      state.recid = [];
      localStorage.setItem("recid", JSON.stringify(state.recid));
    },
  },
});

export const {
  setAddItem,
  setRemoveItem,
  setrue,
  setAddItemToRecent,
  clearItemsInRec,
  clearItemsInFav,
} = favSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export default favSlice.reducer;
