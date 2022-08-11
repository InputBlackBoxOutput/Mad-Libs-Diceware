import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const isMobileDevice = () => {
        if (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i)
        ) {
            return true;
        }
        return false;
    }

    return (
        <div className='container-fluid mt-2 pt-2'>
            <div className='row'>
                <div className="col-md-6">
                    <h6 className={isMobileDevice() ? "text-center" : ""}>
                        <Link to="terms-and-conditions">Terms & Conditions</Link> |
                        <Link to="privacy-policy"> Privacy Policy </Link>
                    </h6>
                </div>
                <div className="col-md-6">
                    <h6 className={isMobileDevice() ? "text-center" : "text-right"}>Copyright © {` ${new Date().getFullYear()} `}
                        InputBlackBoxOutput
                    </h6>
                </div>
            </div>
        </div>);
}

export default Footer;