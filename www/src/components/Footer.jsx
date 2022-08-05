import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className='container-fluid mt-2 pt-2'>
            <div className='row'>
                <div className="col-md-6">
                    <h6>
                        <Link to="terms-and-conditions">Terms & Conditions</Link> |
                        <Link to="privacy-policy"> Privacy Policy </Link>
                    </h6>
                </div>
                <div className="col-md-6">
                    <h6 className="text-right">Copyright © {` ${new Date().getFullYear()} `}
                        InputBlackBoxOutput
                    </h6>
                </div>
            </div>
        </div>);
}

export default Footer;