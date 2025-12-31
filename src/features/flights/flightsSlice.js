import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  sortBy: "PRICE_LOW",
  priceRange: [0, 0],
  basePriceRange: [0, 0],
  meta: {},
};

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    // payload: array of flights (from API)
    setFlights(state, action) {
      const flights = action.payload || [];
      state.flights = flights;
      const prices = flights.length ? flights.map((f) => f.farepr) : [0, 0];
      const minPrice = flights.length ? Math.min(...prices) : 0;
      const maxPrice = flights.length ? Math.max(...prices) : 0;
      state.basePriceRange = [minPrice, maxPrice];
      state.priceRange = [minPrice, maxPrice];
    },
    setMeta(state, action) {
      state.meta = {
        ...(state.meta || {}),
        ...(action.payload || {}),
      };
    },

    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },

    clearFilters(state) {
      state.sortBy = "PRICE_LOW";
      state.priceRange = state.basePriceRange.slice();
    },
  },
});

export const { setFlights, setMeta, setSortBy, setPriceRange, clearFilters } = flightsSlice.actions;

export default flightsSlice.reducer;
