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
    setFlights(state, action) {
      const raw = action.payload || [];
      const flights = raw.map((f) => {
        const farepr = Number(f.farepr ?? f.price ?? f.fare) || 0;
        const ttVal = (f.tt && f.tt[0]) || f.ft || f.duration || 0;
        const durationSec = Number(ttVal) || 0;
        const dt = f.dt || (f.leg && f.leg[0] && f.leg[0].flights && f.leg[0].flights[0] && f.leg[0].flights[0].dt) || "";
        const at = f.at || (f.leg && f.leg[0] && f.leg[0].flights && f.leg[0].flights[0] && f.leg[0].flights[0].at) || "";
        return {
          ...f,
          priceNum: farepr,
          durationSec,
          depart: dt,
          arrive: at,
        };
      });

      state.flights = flights;
      const prices = flights.length ? flights.map((f) => Number(f.priceNum) || 0) : [0, 0];
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
