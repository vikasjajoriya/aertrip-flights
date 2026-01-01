import { useDispatch, useSelector } from "react-redux";
import { setSortBy, clearFilters } from "../../features/flights/flightsSlice";
import { FaArrowDownWideShort, FaArrowUpWideShort } from "react-icons/fa6";

export default function SortFilters() {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.flights);

  const toggle = (baseAsc, baseDesc) => {
    if (sortBy === baseAsc) return baseDesc;
    return baseAsc;
  };

  const btnStyle = {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid rgba(7,59,76,0.08)",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    fontSize: "14px",
  };

  return (
    <div className="flex items-center gap-3 !my-3">
      <button style={btnStyle} onClick={() => dispatch(setSortBy(toggle("PRICE_LOW", "PRICE_HIGH")))}>
        Price {sortBy === "PRICE_LOW" ? <FaArrowDownWideShort color="#14b8a6" size={15}/> : sortBy === "PRICE_HIGH" ? <FaArrowUpWideShort color="#14b8a6" size={15}/> : ""}
      </button>

      <button style={btnStyle} onClick={() => dispatch(setSortBy(toggle("DURATION_ASC", "DURATION_DESC")))}>
        Duration {sortBy === "DURATION_ASC" ? <FaArrowDownWideShort color="#14b8a6" size={15}/> : sortBy === "DURATION_DESC" ? <FaArrowUpWideShort color="#14b8a6" size={15}/> : ""}
      </button>

      <button style={btnStyle} onClick={() => dispatch(setSortBy(toggle("DEPART_ASC", "DEPART_DESC")))}>
        Depart {sortBy === "DEPART_ASC" ? <FaArrowDownWideShort color="#14b8a6" size={15}/> : sortBy === "DEPART_DESC" ? <FaArrowUpWideShort color="#14b8a6" size={15}/> : ""}
      </button>

      <button style={btnStyle} onClick={() => dispatch(setSortBy(toggle("ARRIVE_ASC", "ARRIVE_DESC")))}>
        Arrive {sortBy === "ARRIVE_ASC" ? <FaArrowDownWideShort color="#14b8a6" size={15}/> : sortBy === "ARRIVE_DESC" ? <FaArrowUpWideShort color="#14b8a6" size={15}/> : ""}
      </button>
      <button style={{ ...btnStyle, background: "#f4f8fb",border:"1px solid #14b8a6",color:"#073b4c" }} onClick={() => dispatch(clearFilters())}>Clear Filters</button>
    </div>
  );
}
