import '../assets/styles/flooter.css'; // Import the associated CSS file
import {CiFacebook} from "react-icons/ci";
import {IoLogoWhatsapp} from "react-icons/io";
import {FaLinkedin} from "react-icons/fa";
import {RiTwitterXFill} from "react-icons/ri"; // Import the social icons component

const Flooter = () => {
    return (
        <div className="flooter-container">
            <div className="social-icons">
                <a className='social-icon' href="https://twitter.com/YourTwitterHandle"><CiFacebook/></a>
                <a className='social-icon' href="https://twitter.com/YourTwitterHandle"><IoLogoWhatsapp/></a>
                <a className='social-icon' href="https://twitter.com/YourTwitterHandle"><FaLinkedin /></a>
                <a className='social-icon' href="https://twitter.com/YourTwitterHandle"><RiTwitterXFill /></a>
            </div>
            <p className="flooter-text">© 2023 Mlinzi Tech. Tous droits réservés.</p>
        </div>
    );
};

export default Flooter;