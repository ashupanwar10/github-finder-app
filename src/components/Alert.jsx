import React, { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

function Alert() {
    const { alert } = useContext(AlertContext);

    return (
        alert !== null && (
            <div className="flex item-start mb-4 space-x-2 ">
                {alert.type === "error" && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01"
                        />
                    </svg>
                )}
                <p className="flex-1 text-base font-semibold leading-7 text-white">
                    <strong>{alert.msg} </strong>
                </p>
            </div>
        )
    );
}

export default Alert;
