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

    switch (sortBy) {
      case "PRICE_LOW":
        result.sort((a, b) => (Number(a.priceNum || 0) - Number(b.priceNum || 0)));
        break;
      case "PRICE_HIGH":
        result.sort((a, b) => (Number(b.priceNum || 0) - Number(a.priceNum || 0)));
        break;
      case "DURATION_ASC":
        result.sort((a, b) => (Number(a.durationSec || 0) - Number(b.durationSec || 0)));
        break;
      case "DURATION_DESC":
        result.sort((a, b) => (Number(b.durationSec || 0) - Number(a.durationSec || 0)));
        break;
      case "DEPART_ASC":
        result.sort((a, b) => (String(a.depart || "").localeCompare(String(b.depart || ""))));
        break;
      case "DEPART_DESC":
        result.sort((a, b) => (String(b.depart || "").localeCompare(String(a.depart || ""))));
        break;
      case "ARRIVE_ASC":
        result.sort((a, b) => (String(a.arrive || "").localeCompare(String(b.arrive || ""))));
        break;
      case "ARRIVE_DESC":
        result.sort((a, b) => (String(b.arrive || "").localeCompare(String(a.arrive || ""))));
        break;
      default:
        break;
    }

    return result;
  }
);
