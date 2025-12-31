import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, clearFilters } from "../../features/flights/flightsSlice";

import "./priceSlider.css";

export default function PriceSlider() {
    const dispatch = useDispatch();
    const { flights, priceRange, basePriceRange } = useSelector((state) => state.flights);
    const [activeThumb, setActiveThumb] = useState(null);
    const [baseMin, baseMax] = basePriceRange && basePriceRange.length ? basePriceRange : [0, 0];
    const [minSelected, maxSelected] = priceRange && priceRange.length ? priceRange : [baseMin, baseMax];

    // ensure sensible defaults if flights not loaded yet
    const dataMin = baseMin;
    const dataMax = baseMax;

    const onMinChange = (e) => {
        const val = Number(e.target.value);
        const newMin = Math.min(val, maxSelected);
        dispatch(setPriceRange([newMin, maxSelected]));
    };

    const onMaxChange = (e) => {
        const val = Number(e.target.value);
        const newMax = Math.max(val, minSelected);
        dispatch(setPriceRange([minSelected, newMax]));
    };

    // percentage positions for track background
    const percentMin = useMemo(() => (dataMax > dataMin ? ((minSelected - dataMin) / (dataMax - dataMin)) * 100 : 0), [minSelected, dataMin, dataMax]);
    const percentMax = useMemo(() => (dataMax > dataMin ? ((maxSelected - dataMin) / (dataMax - dataMin)) * 100 : 100), [maxSelected, dataMin, dataMax]);

    return (
        <div className="price-card">
            <h4 className="price-title">Price</h4>

            <div className="price-values">
                <span>₹{dataMin}</span>
                <span>₹{dataMax}</span>
            </div>

            <div className="range-container">
                <input
                    className="thumb thumb-left"
                    type="range"
                    min={dataMin}
                    max={dataMax}
                    value={minSelected}
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
                    value={maxSelected}
                    onChange={onMaxChange}
                    onMouseDown={() => setActiveThumb("max")}
                    onTouchStart={() => setActiveThumb("max")}
                    style={{ zIndex: activeThumb === "max" ? 3 : 2 }}
                />

                <div className="range-track">
                    <div className="range-selection" style={{ left: `${percentMin}%`, right: `${100 - percentMax}%` }} />
                </div>
            </div>

            <div className="price-selected">Selected: ₹{minSelected} - ₹{maxSelected}</div>

            <div className="price-actions" style={{ flexDirection: "column" }}>
                <button className="btn btn-clear" onClick={() => dispatch(clearFilters())}>Clear Filters</button>
            </div>
        </div>
    );
}
