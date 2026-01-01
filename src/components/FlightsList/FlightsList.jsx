import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredFlights } from "../../features/flights/flightsSelectors";
import FlightCard from "../FlightCard/FlightCard";
import PriceSlider from "../Filters/PriceSlider";
import SortFilters from "../Filters/SortFilters";
import { useGetFlightsQuery } from "../../features/flights/flightsApi";
import { clearFilters, setFlights, setMeta } from "../../features/flights/flightsSlice";

export default function FlightsList() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error, refetch } = useGetFlightsQuery();
  // console.log("data",data);
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

  if (isLoading) return <div className="absolute top-[170px] w-full flex items-center justify-center h-[50vh]"><div className="loader" /></div>;
  if (isError) return (
    <div className="absolute top-[170px] w-full flex items-center justify-center h-[50vh] flex-col gap-4">
      <p className="text-red-500 text-[20px]">{error?.data || "Error loading flights"}</p>
      <div className="flex gap-2">
        <button className="!px-3 !py-2 rounded bg-teal-500 text-white cursor-pointer" onClick={() => refetch()}>Retry</button>
      </div>
    </div>
  );

  return (
    <div className="absolute top-[170px] w-full !px-[60px] flex flex-col gap-8 lg:flex-row"
    >
      <aside className="w-full lg:w-[400px]">
        <PriceSlider />
      </aside>

      <main className="flex-1">
        <div className="flex items-center justify-between !mb-[14px] !px-6 !py-0 rounded-[12px] bg-[#02020208]">
          <div className="text-[18px] font-semibold">{filteredFlights?.length || 0} Flights</div>
          <SortFilters />
        </div>

        {filteredFlights?.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-lg mb-4">No flights match your filters.</p>
            <div className="flex items-center justify-center gap-2">
              <button className="!px-3 !py-2 rounded bg-teal-500 text-white cursor-pointer" onClick={() => dispatch(clearFilters())}>Clear Filters</button>
            </div>
          </div>
        ) : (
          filteredFlights?.map((f) => (
            <FlightCard key={f?.id} flight={f} />
          ))
        )}
      </main>
    </div>
  );
}
