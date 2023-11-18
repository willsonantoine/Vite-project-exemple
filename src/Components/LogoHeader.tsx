import Images from "./Images.tsx";
import {useNavigate} from "react-router-dom";

function ImageHeader() {
    const navigate = useNavigate();
    return (<div style={{display: "flex", flexDirection: 'row'}} onClick={() => navigate('/')}>
        <img src={Images.logo} width={30} height={30} className='menu-logo' alt='Logo'/>
        <h4 style={{marginTop: 9, marginLeft: 8, color: 'black'}}>Mlinzi System</h4>
    </div>)
}



export default ImageHeader