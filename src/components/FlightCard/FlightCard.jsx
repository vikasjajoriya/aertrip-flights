import React from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import { useSelector } from "react-redux";

const FlightCard = ({ flight }) => {
  const leg = (flight.leg && flight.leg[0] && flight.leg[0].flights && flight.leg[0].flights[0]) || null;
  const departure = leg ? leg.fr : flight.fr || flight.from;
  const departureTime = flight.depart || (leg ? leg.dt : flight.dt) || flight.departureTime;
  const arrival = leg ? leg.to : flight.to || flight.at;
  const arrivalTime = flight.arrive || (leg ? leg.at : flight.at) || flight.arrivalTime;
  const airline = (leg && leg.al) || (flight.al && (Array.isArray(flight.al) ? flight.al[0] : flight.al)) || flight.airline || "-";
  const durationSec = leg ? leg.ft : flight.ft || flight.duration || (flight.tt && flight.tt[0]);
  const durationText = durationSec ? `${Math.floor(durationSec / 3600)}h ${Math.floor((durationSec % 3600) / 60)}m` : "-";
  const price = flight.farepr || flight.price || flight.fare || "-";

  const airlineCode = Array.isArray(airline) ? airline[0] : airline;

  const meta = useSelector((state) => state?.flights.meta || {});
  // console.log("meta",meta);
  const alMaster = meta.alMaster || {};
  const aldet = meta.aldet || {};
  const airlineFull = (alMaster && alMaster[airlineCode] && alMaster[airlineCode].name) || aldet[airlineCode] || airlineCode;
  const logoUrl = `https://content.airhex.com/content/logos/airlines_${String(airlineCode).toUpperCase()}_200_200_s.png`;

  return (
    <div className="!p-4 !mb-[14px] rounded-[12px] border border-[#ebebeb] shadow-[0_0_40px_10px_rgba(11,30,40,0.06)]" >
      <div className="flex items-center justify-between">
        <div className="w-[160px] flex items-center gap-[10px]">
          {
            logoUrl ? (
              <img
                src={logoUrl}
                alt={airlineFull}
                className="w-[48px] h-[48px] object-contain rounded-[6px] bg-white"
              />
            ) :
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#14b8a6] rounded-[6px]">
                <GiAirplaneDeparture className="text-white text-[20px]" />
              </div>
          }

          <div className="font-semibold">{airlineFull}</div>
        </div>

        <div className="w-[140px] !m-0 ">
          <h3 className="!m-0 font-[18px] font-semibold">{departureTime || "N/A"}</h3>
          <span className="font-[13px] text-[#6b7280]" title={leg ? `${leg.fr} ${leg.dtm || ''}` : departure}>{departure}{leg && leg.dtm ? ` ${leg.dtm}` : ''}</span>
        </div>

        <div className="w-[220px] text-center">
          <div className="border-t-2 border-t-[rgba(20,184,166,1)] border-dashed !my-[6px]" />
          <div className="!font-[12px] text-[#14b8a6] !font-semibold">{durationText || "N/A"}</div>
        </div>

        <div className="time-block w-[120px]">
          <h3 className="!m-0 font-[18px] font-semibold">{arrivalTime}</h3>
          <span className="font-[13px] text-[#6b7280]" title={leg ? `${leg.to} ${leg.atm || ''}` : arrival}>{arrival}{leg && leg.atm ? ` ${leg.atm}` : ''}</span>
        </div>

        <div className="flex justify-between items-center w-[180px]">
          <h3 className="!m-0 font-[18px] font-bold">₹ {price || 0}</h3>
          <button className="!p-2 rounded-[8px] border-0 bg-[#14b8a6] text-white text-[14px]">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlightCard);
