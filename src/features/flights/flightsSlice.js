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

          const parseDurationToSeconds = (val) => {
            if (val === undefined || val === null) return 0;
            if (typeof val === "number") return Number(val) || 0;
            const s = String(val).trim();
            if (!s) return 0;

            if (s.includes(":")) {
              const parts = s.split(":").map((p) => Number(p) || 0);
              if (parts.length === 2) return parts[0] * 3600 + parts[1] * 60;
              if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
            }

            const hMatch = s.match(/(\d+)\s*h/i);
            const mMatch = s.match(/(\d+)\s*m/i);
            if (hMatch || mMatch) {
              const h = hMatch ? Number(hMatch[1]) : 0;
              const m = mMatch ? Number(mMatch[1]) : 0;
              return h * 3600 + m * 60;
            }

            const n = Number(s.replace(/[^0-9.]/g, "")) || 0;
            if (n > 1000) return n;
            return n * 60;
          };

          const leg0 = f.leg && f.leg[0] && f.leg[0].flights && f.leg[0].flights[0];
          const ttVal = (leg0 && ((leg0.tt && leg0.tt[0]) || leg0.ft || leg0.duration)) || (f.tt && f.tt[0]) || f.ft || f.duration || 0;
          const durationSec = parseDurationToSeconds(ttVal);

        const dt = f.dt || (leg0 && leg0.dt) || "";
        const at = f.at || (leg0 && leg0.at) || "";

        const parseTimeToSeconds = (t) => {
          if (t === undefined || t === null) return 0;
          if (typeof t === "number") return Number(t) || 0;
          const s = String(t).trim();
          if (!s) return 0;

          // ISO datetime
          const iso = Date.parse(s);
          if (!isNaN(iso)) {
            const d = new Date(iso);
            return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
          }

          // formats like HH:MM or HH:MM:SS
          if (s.includes(":")) {
            const parts = s.split(":").map((p) => Number(p) || 0);
            if (parts.length === 2) return parts[0] * 3600 + parts[1] * 60;
            if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
          }

          // AM/PM format
          const ampm = s.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)/i);
          if (ampm) {
            let hh = Number(ampm[1]) || 0;
            const mm = Number(ampm[2]) || 0;
            const ss = Number(ampm[3]) || 0;
            const am = /^am$/i.test(ampm[4]);
            if (!am && hh < 12) hh += 12;
            if (am && hh === 12) hh = 0;
            return hh * 3600 + mm * 60 + ss;
          }

          return 0;
        };

        const departSec = parseTimeToSeconds(dt);
        const arriveSec = parseTimeToSeconds(at);
        return {
          ...f,
          priceNum: farepr,
          durationSec,
          depart: dt,
          arrive: at,
          departSec,
          arriveSec,
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
