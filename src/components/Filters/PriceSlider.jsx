import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, clearFilters } from "../../features/flights/flightsSlice";

export default function PriceSlider() {
    const dispatch = useDispatch();
    const { flights, priceRange, basePriceRange } = useSelector((state) => state.flights);
    const [activeThumb, setActiveThumb] = useState(null);
    const [baseMin, baseMax] = basePriceRange && basePriceRange.length ? basePriceRange : [0, 0];
    const [minSelected, maxSelected] = priceRange && priceRange.length ? priceRange : [baseMin, baseMax];
    const [localMin, setLocalMin] = useState(minSelected);
    const [localMax, setLocalMax] = useState(maxSelected);
    const debounceRef = React.useRef(null);

    // ensure sensible defaults if flights not loaded yet
    const dataMin = baseMin;
    const dataMax = baseMax;

    const onMinChange = (e) => {
        const val = Number(e.target.value);
        const clamped = Math.min(val, localMax);
        setLocalMin(clamped);
    };

    const onMaxChange = (e) => {
        const val = Number(e.target.value);
        const clamped = Math.max(val, localMin);
        setLocalMax(clamped);
    };

    // debounce updates to redux to avoid rapid dispatches
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            // ensure min <= max
            const min = Math.min(Number(localMin) || 0, Number(localMax) || 0);
            const max = Math.max(Number(localMin) || 0, Number(localMax) || 0);
            dispatch(setPriceRange([min, max]));
        }, 250);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [localMin, localMax, dispatch]);

    // percentage positions for track background
    const percentMin = useMemo(() => (dataMax > dataMin ? ((minSelected - dataMin) / (dataMax - dataMin)) * 100 : 0), [minSelected, dataMin, dataMax]);
    const percentMax = useMemo(() => (dataMax > dataMin ? ((maxSelected - dataMin) / (dataMax - dataMin)) * 100 : 100), [maxSelected, dataMin, dataMax]);

    useEffect(() => {
        setLocalMin(minSelected);
        setLocalMax(maxSelected);
    }, [minSelected, maxSelected]);

    return (
        <div className="w-full !p-4 rounded-lg border border-[rgba(20,45,80,0.06)] shadow-[0_0_40px_10px_rgba(11,30,40,0.06)]">
            <h4 className="!mb-[25px] text-[16px] font-semibold text-black">Price Range</h4>

            <div className="flex justify-between text-[14px] text-black !mb-2">
                <span>₹{dataMin}</span>
                <span>₹{dataMax}</span>
            </div>

            <div className="relative h-[36px]">
                <input
                    className="thumb thumb-left"
                    type="range"
                    min={dataMin}
                    max={dataMax}
                    value={localMin}
                    onChange={onMinChange}
                    onMouseDown={() => setActiveThumb("min")}
                    onTouchStart={() => setActiveThumb("min")}
                    style={{ zIndex: activeThumb === "min" ? 3 : 2 }}
                />

                <input
                    className="thumb thumb-right"
                    type="range"
                    min={dataMin}
                    max={dataMax}
                    value={localMax}
                    onChange={onMaxChange}
                    onMouseDown={() => setActiveThumb("max")}
                    onTouchStart={() => setActiveThumb("max")}
                    style={{ zIndex: activeThumb === "max" ? 3 : 2 }}
                />

                <div className="absolute left-0 right-0 top-[16px] h-[6px] bg-[#e6eef2] rounded-[4px]">
                    <div className="absolute top-0 bottom-0 rounded-[4px] bg-gradient-to-r" 
                    style={{ left: `${percentMin}%`, right: `${100 - percentMax}%`,backgroundImage: "linear-gradient(90deg, #14b8a6, #14b8a563)" }} />
                </div>
            </div>

            <div className="!mt-2 text-[13px] text-[#0b647b]">Selected Range: ₹{minSelected} - ₹{maxSelected}</div>

            <div className="!mt-6 flex">
                <button className="!px-[10px] !py-[8px] rounded-[6px] border-0 cursor-pointer bg-[#f4f8fb] text-[#073b4c] !border border-[#14b8a6] text-[14px]" onClick={() => dispatch(clearFilters())}>Clear Filters</button>
            </div>
        </div>
    );
}
