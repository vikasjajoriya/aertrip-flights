import { createSelector } from "@reduxjs/toolkit";

export const selectFlightsState = state => state.flights;

export const selectFilteredFlights = createSelector(
  [selectFlightsState],
  ({ flights, sortBy, priceRange }) => {
    const min = Number(priceRange?.[0] ?? 0) || 0;
    const max = Number(priceRange?.[1] ?? Infinity) || Infinity;

    let result = flights.filter((f) => {
      const p = Number(f.priceNum ?? f.farepr ?? 0) || 0;
      return p >= min && p <= max;
    });

    const num = (v) => Number(v || 0) || 0;
    const cmpNumAsc = (a, b) => num(a) - num(b);
    const cmpNumDesc = (a, b) => num(b) - num(a);
    const cmpStr = (a, b) => String(a || "").localeCompare(String(b || ""));

    switch (sortBy) {
      case "PRICE_LOW":
        result.sort((a, b) => {
          const r = cmpNumAsc(a.priceNum, b.priceNum);
          if (r !== 0) return r;
          const d = cmpNumAsc(a.durationSec, b.durationSec);
          if (d !== 0) return d;
          return cmpNumAsc(a.departSec, b.departSec);
        });
        break;
      case "PRICE_HIGH":
        result.sort((a, b) => {
          const r = cmpNumDesc(a.priceNum, b.priceNum);
          if (r !== 0) return r;
          const d = cmpNumAsc(a.durationSec, b.durationSec);
          if (d !== 0) return d;
          return cmpNumAsc(a.departSec, b.departSec);
        });
        break;
      case "DURATION_ASC":
        result.sort((a, b) => {
          const r = cmpNumAsc(a.durationSec, b.durationSec);
          if (r !== 0) return r;
          const p = cmpNumAsc(a.priceNum, b.priceNum);
          if (p !== 0) return p;
          return cmpNumAsc(a.departSec, b.departSec);
        });
        break;
      case "DURATION_DESC":
        result.sort((a, b) => {
          const r = cmpNumDesc(a.durationSec, b.durationSec);
          if (r !== 0) return r;
          const p = cmpNumAsc(a.priceNum, b.priceNum);
          if (p !== 0) return p;
          return cmpNumAsc(a.departSec, b.departSec);
        });
        break;
      case "DEPART_ASC":
        result.sort((a, b) => {
          const r = cmpNumAsc(a.departSec, b.departSec);
          if (r !== 0) return r;
          return cmpNumAsc(a.durationSec, b.durationSec);
        });
        break;
      case "DEPART_DESC":
        result.sort((a, b) => {
          const r = cmpNumDesc(a.departSec, b.departSec);
          if (r !== 0) return r;
          return cmpNumAsc(a.durationSec, b.durationSec);
        });
        break;
      case "ARRIVE_ASC":
        result.sort((a, b) => {
          const r = cmpNumAsc(a.arriveSec, b.arriveSec);
          if (r !== 0) return r;
          return cmpNumAsc(a.durationSec, b.durationSec);
        });
        break;
      case "ARRIVE_DESC":
        result.sort((a, b) => {
          const r = cmpNumDesc(a.arriveSec, b.arriveSec);
          if (r !== 0) return r;
          return cmpNumAsc(a.durationSec, b.durationSec);
        });
        break;
      default:
        break;
    }

    return result;
  }
);
