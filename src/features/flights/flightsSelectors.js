import { createSelector } from "@reduxjs/toolkit";

export const selectFlightsState = state => state.flights;

export const selectFilteredFlights = createSelector(
  [selectFlightsState],
  ({ flights, sortBy, priceRange }) => {
    let result = flights.filter(
      f => f.farepr >= priceRange[0] && f.farepr <= priceRange[1]
    );

    switch (sortBy) {
      case "PRICE_LOW":
        result.sort((a, b) => a.farepr - b.farepr);
        break;
      case "PRICE_HIGH":
        result.sort((a, b) => b.farepr - a.farepr);
        break;
      case "DURATION_ASC":
        result.sort((a, b) => (a.tt && a.tt[0] ? a.tt[0] : 0) - (b.tt && b.tt[0] ? b.tt[0] : 0));
        break;
      case "DURATION_DESC":
        result.sort((a, b) => (b.tt && b.tt[0] ? b.tt[0] : 0) - (a.tt && a.tt[0] ? a.tt[0] : 0));
        break;
      case "DEPART_ASC":
        result.sort((a, b) => a.dt.localeCompare(b.dt));
        break;
      case "DEPART_DESC":
        result.sort((a, b) => b.dt.localeCompare(a.dt));
        break;
      case "ARRIVE_ASC":
        result.sort((a, b) => a.at.localeCompare(b.at));
        break;
      case "ARRIVE_DESC":
        result.sort((a, b) => b.at.localeCompare(a.at));
        break;
      default:
        break;
    }

    return result;
  }
);
