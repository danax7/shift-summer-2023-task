import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./thunk";
import { IMovie } from "./types";
import axios from "axios";
import { url } from "../../app/constants/requestUrl";
import { initialState } from "./state";

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action: PayloadAction<IMovie[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } =
  moviesSlice.actions;

export default moviesSlice.reducer;

export const fetchMovies = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchMoviesStart());
    const response = await axios.get(url + "/cinema/today");
    const data = response.data;
    dispatch(fetchMoviesSuccess(data.films));
  } catch (error) {
    dispatch(fetchMoviesFailure(error.message));
  }
};
