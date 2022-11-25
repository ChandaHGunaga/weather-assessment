import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherAction = createAsyncThunk(
  "weather/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&units=metric&appid=b37fc940da874bfad63f5b69799bc99e`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    // setTrue: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
      console.log("fetching data...");
    });
    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
      state.loading = false;
      state.weather = action?.payload;
      localStorage.setItem("dataFromThunk", JSON.stringify(state.weather));
      state.error = undefined;
      //   state.setTrue = true;
      console.log("fetched data successfully");
    });
    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action?.payload;
    });
  },
});

export default weatherSlice.reducer;
