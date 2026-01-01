import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredFlights } from "../../features/flights/flightsSelectors";
import FlightCard from "../FlightCard/FlightCard";
import PriceSlider from "../Filters/PriceSlider";
import SortFilters from "../Filters/SortFilters";
import { useGetFlightsQuery } from "../../features/flights/flightsApi";
import { setFlights, setMeta } from "../../features/flights/flightsSlice";

export default function FlightsList() {
  const dispatch = useDispatch();
  const { data, isLoading, isError,error } = useGetFlightsQuery();
console.log("data",data);
// console.log("error",error);

  useEffect(() => {
    if (!data) return;

    const maybeRoot = data?.flights?.[0]?.results;
    const flights = (maybeRoot?.j) || [];
    dispatch(setFlights(flights));

    const meta = {};
    if (maybeRoot.aldet) meta.aldet = maybeRoot.aldet;
    if (maybeRoot.alMaster) meta.alMaster = maybeRoot.alMaster;
    if (Object.keys(meta).length) dispatch(setMeta(meta));
  }, [data, dispatch]);

  const filteredFlights = useSelector(selectFilteredFlights);

   if (isLoading) return <div style={{ margin: "120px 60px 0px 60px",display:"flex",justifyContent:"center" }}><div className="loader"/></div>;
  if (isError) return <div style={{ margin: "120px 60px 0px 60px",textAlign:"center" }}><p style={{color:"red",fontSize:"28px"}}>{error?.data || "Error loading flights"}</p></div>;

  return (
    <div style={{ margin: "80px 60px 0px 60px", display: "flex", gap: 20 }}>
      <aside style={{ width: 400 }}>
        <PriceSlider />
      </aside>

      <main style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14,padding:"0px 1.5rem",backgroundColor:"#02020208",borderRadius:"12px"}}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{filteredFlights.length} Flights</div>
          <SortFilters />
        </div>

        {filteredFlights.map((f) => (
          <FlightCard key={f.id} flight={f} />
        ))}
      </main>
    </div>
  );
}
