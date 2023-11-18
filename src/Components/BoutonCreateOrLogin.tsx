import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const BoutonCreateOrLogin = () => {

    const navigate = useNavigate();
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginLeft:20,marginTop:10}}>
            <Button onClick={() => navigate('/create-account')}>Créer un compte</Button>
            <Button onClick={() => navigate('/login')}>Se connecter</Button>
        </div>
    )

}

export default BoutonCreateOrLogin;