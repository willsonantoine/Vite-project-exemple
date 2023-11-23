import {useState} from "react";
import img from '../assets/login-1.jpg'
import AlertMessage from "../Components/NotificationAlert.tsx";
import HttpRequest from "../Controllers/HttpRequest.tsx";
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Input, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import Flooter from "../Components/Flooter.tsx";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('+243');
    const [password, setPassword] = useState('');
    const [showMessageAlert, setshowMessageAlert] = useState(false);
    const [MessageAlert, setMessageAlert] = useState('');
    const [TyAlert, setTypeAlert] = useState(false);
    const [isSpin, setSpin] = useState(false);
    const login = async () => {
        if (username !== null && password !== undefined && username !== '') {
            setSpin(true)
            HttpRequest('/user/login', 'POST', {username, password}).then((response) => {
                const data = response.data;
                if (data.status == 200) {
                    localStorage.setItem('token', data.data.token);
                    navigate('/app/home')
                    setSpin(false)
                }
                showAlert(data.message, (data.status == 200))
            }).catch((error) => {
                setSpin(false)
                console.log(error)
                if (error.code === 'ERR_BAD_REQUEST') {
                    showAlert("Nom d'utilisateur ou mot de passe incorrect", false)
                } else {
                    showAlert("Une erreur s'est produite", false)
                }

            })
        } else {
            showAlert("Veillez saisir le nom d'utilisateur et le mot de password", false)
        }
    }


    const showAlert = (message: string, isAlert: boolean) => {
        setTypeAlert(isAlert)
        setshowMessageAlert(true)
        setMessageAlert(message)
    }
    return (<div className='row' style={{marginRight: 5}}>
        <div className='col-md-6' id='left-login-dif' style={{textAlign: 'center', paddingTop: 50}}>
            <img src={img} alt='logo' height={350}/>
        </div>
        <div className='col-md-6 ' id='rigth-login-dif'>
            <div style={{paddingTop: 50, textAlign: 'left'}}>
                <h1>Mlinzi System</h1>
                <h5 style={{fontSize: 14}}>Un system qui facilite la vie</h5>
            </div>
            <br/>
            <div style={{textAlign: "left"}}>
                <label className='labelInput'>Non d'utilisateur</label>
                <Input className='textInput2' value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       type='text' placeholder='Username'/>
            </div>
            <div style={{textAlign: "left"}}>
                <label className='labelInput'>Non d'utilisateur</label>
                <Input.Password className='textInput2' value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mot de passe"
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                />

            </div>
            {showMessageAlert ? <AlertMessage message={MessageAlert} type={TyAlert}/> : ``}
            <div style={{flexDirection: "row", display: "flex", justifyContent: 'space-between'}}>
                <div style={{textAlign: "left", paddingTop: 10}}>
                    <a>Vous n'avez pas un compte ? Créer un compte</a>
                </div>
                <div id='div-btn-seconnecter' style={{marginTop: 10}}>
                    <button type='submit' disabled={isSpin} onClick={login} className='button'>
                        Se connecter {isSpin ? <Spin/> : ``} </button>
                </div>
            </div>
        </div>
        <Flooter/>
    </div>)
}

export default Login