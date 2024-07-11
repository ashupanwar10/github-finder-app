import React from "react";
import { FaHashtag } from "react-icons/fa";

function Footer() {
    const footerYear = new Date().getFullYear();

    return (
        <footer className="footer p-2 bg-gray-700 footer-center ">
            <div>
                <FaHashtag className="text-4xl text-white" />
                <p>Copyright &copy;{footerYear} All right reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
