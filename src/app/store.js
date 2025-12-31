import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flights/flightsSlice";
import { flightsApi } from "../features/flights/flightsApi";

export const store = configureStore({
  reducer: {
    flights: flightsReducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightsApi.middleware),
});
