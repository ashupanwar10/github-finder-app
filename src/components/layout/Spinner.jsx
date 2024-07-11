import React from "react";
import Spin from "./assets/spinner.gif";

function Spinner() {
    return (
        <div className="w-100 mt-20">
            <img src={Spin} alt="Loading" className="text-center mx-auto" />
        </div>
    );
}

export default Spinner;
