import '../../assets/styles/Contact.css';
import MenuRoot from "../../Components/MenuRoot.tsx";
import Flooter from "../../Components/Flooter.tsx"; // Import the associated CSS file

const Contact = () => {
    return (
        <div className='root-home-contact'>
            <MenuRoot/>
            <div className="contact-container">
                <h1 className="contact-title">Contactez-nous</h1>
                <div className="contact-info">
                    <p>Téléphone 1 : <a href="tel:+243858250506">+243858250506</a></p>
                    <p>Téléphone 2 : <a href="tel:+243978150288">+243978150288</a></p>
                    <p>Téléphone 3 : <a href="tel:+243990084881">+243990084881</a></p>
                    <p>Email 1 : <a href="mailto:contact@mlinzitech.com">contact@mlinzitech.com</a></p>
                    <p>Email 2 : <a href="mailto:mlinzirdc@gmail.com">mlinzirdc@gmail.com</a></p>
                </div>
                <p className="contact-website">
                    Vous pouvez également visiter notre site web  : <a
                    href="https://www.mlinzitech.com/">Mlinzi Technologie</a>
                </p>
                <p className="contact-message">
                    N'hésitez pas à nous contacter, nous sommes impatients de travailler avec vous ! 🚀
                </p>
            </div>
            <Flooter/>
        </div>

    );
};

export default Contact;
