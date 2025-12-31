import SortFilters from "../Filters/SortFilters";
import FlightsList from "../FlightsList/FlightsList";
import "./HeroSection.css";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const HeroSection = () => {

    return (
        <section className="hero-wrapper">
            <section className="hero">
                {/* Overlay */}
                <div className="hero-overlay" />
                <div className="hero-container">
                    <div className="hero-text">
                        <h1>Let’s Begin the Journey</h1>
                    </div>
                </div>
                <div className="hero-searchbar">
                    <div className="flight-search">

                        {/* FROM */}
                        <div className="field">
                            <span className="label">From</span>
                            <h4>Delhi</h4>
                            <span className="code">DEL</span>
                        </div>

                        {/* SWITCH */}
                        <div className="swap">
                            <HiOutlineSwitchHorizontal />
                        </div>

                        {/* TO */}
                        <div className="field">
                            <span className="label">To</span>
                            <h4>Mumbai</h4>
                            <span className="code">BOM</span>
                        </div>

                        {/* DEPART */}
                        <div className="field">
                            <span className="label">Depart</span>
                            <h4>31 December <span className="day">Wed</span></h4>
                            
                        </div>

                        {/* SEARCH */}
                        <button className="login_signup_btn">
                            Search
                        </button>

                    </div>
                </div>
            </section>
            <FlightsList />
        </section>
    );
};

export default HeroSection;
