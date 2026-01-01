import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import "./FlightCard.css";

const FlightCard = ({ flight }) => {

  // Support two shapes: API-format flight object (with leg->flights) or normalized keys
  const leg = (flight.leg && flight.leg[0] && flight.leg[0].flights && flight.leg[0].flights[0]) || null;

  const departure = leg ? leg.fr : flight.fr || flight.from;
  const departureTime = leg ? leg.dt : flight.dt || flight.departureTime;
  const arrival = leg ? leg.to : flight.to || flight.at;
  const arrivalTime = leg ? leg.at : flight.at || flight.arrivalTime;
  const airline = (leg && leg.al) || (flight.al && (Array.isArray(flight.al) ? flight.al[0] : flight.al)) || flight.airline || "-";
  const durationSec = leg ? leg.ft : flight.ft || flight.duration || (flight.tt && flight.tt[0]);
  const durationText = durationSec ? `${Math.floor(durationSec / 3600)}h ${Math.floor((durationSec % 3600) / 60)}m` : "-";
  const price = flight.farepr || flight.price || flight.fare || "-";

  const airlineCode = Array.isArray(airline) ? airline[0] : airline;

  const meta = useSelector((state) => state?.flights.meta || {});

  console.log("meta",meta);
  
  const alMaster = meta.alMaster || {};
  const aldet = meta.aldet || {};
  const airlineFull = (alMaster && alMaster[airlineCode] && alMaster[airlineCode].name) || aldet[airlineCode] || airlineCode;
  const airlineBg = (alMaster && alMaster[airlineCode] && alMaster[airlineCode].bgcolor) || "#0077cc";

  const logoUrl = `https://content.airhex.com/content/logos/airlines_${String(airlineCode).toUpperCase()}_200_200_s.png`;
  const placeholderSvg = `data:image/svg+xml;utf8,` + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%' height='100%' rx='12' fill='${airlineBg.replace("#","%23")}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='white'>${String(airlineFull).split(" ")[0].slice(0,2).toUpperCase()}</text></svg>`
  );

  return (
    <div className="flight-card" >
      <div className="flight-main">
        <div className="airline" style={{ display: "flex", alignItems: "center", gap: 10, width: 140 }}>
          <img
            src={logoUrl}
            alt={airlineFull}
            style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 6, background: "#fff" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholderSvg;
            }}
          />
          <div style={{ fontWeight: 600 }}>{airlineFull}</div>
        </div>

        <div className="time-block" style={{ minWidth: 140 }}>
          <h3 style={{ margin: 0 }}>{departureTime}</h3>
          <span className="airport-code" title={leg ? `${leg.fr} ${leg.dtm || ''}` : departure} style={{ color: "#6b7a80" }}>{departure}{leg && leg.dtm ? ` ${leg.dtm}` : ''}</span>
        </div>

        <div style={{ width: 220, textAlign: "center" }}>
          <div className="dotted-line" style={{ marginBottom: 6 }} />
          <div className="non-stop" style={{ fontSize: 12, color: "#14b8a6", fontWeight: 600 }}>{durationText}</div>
        </div>

        <div className="time-block" style={{ minWidth: 140 }}>
          <h3 style={{ margin: 0 }}>{arrivalTime}</h3>
          <span className="airport-code" title={leg ? `${leg.to} ${leg.atm || ''}` : arrival} style={{ color: "#6b7a80" }}>{arrival}{leg && leg.atm ? ` ${leg.atm}` : ''}</span>
        </div>

        <div className="price" style={{ display: "flex",justifyContent:"space-between",alignItems:"end", width: 180 }}>
          <h3 style={{ margin: 0 }}>₹ {price}</h3>
          <button style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, border: "none", background: "#14b8a6", color: "#fff" }}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
