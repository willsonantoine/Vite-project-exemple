import {useEffect, useState} from "react";
import img from '../assets/login-1.jpg'
import AlertMessage from "../Components/NotificationAlert.tsx";
import HttpRequest from "../Controllers/HttpRequest.tsx";
import '../assets/styles/CreateAccount.css'
import {Spin} from "antd";
import {Link, useNavigate} from "react-router-dom";
import Colors from "../Components/Colors.tsx";
import Flooter from "../Components/Flooter.tsx";
import constantes from "../Controllers/Constantes.tsx";

const ValidateAccount = () => {
    const navigate = useNavigate();
    const [code_val, setCode_val] = useState('');
    const [phone, setPhone] = useState('');

    const [showMessageAlert, setshowMessageAlert] = useState(false);
    const [MessageAlert, setMessageAlert] = useState('');
    const [TyAlert, setTypeAlert] = useState(false);
    const [isSpin, setSpin] = useState(false);

    useEffect(() => {
        const phone = localStorage.getItem('phone');
        if(phone){
            setPhone(phone)
        }

    }, [])

    const login = async () => {
        if (code_val !== null && phone) {
            setSpin(true)
            HttpRequest('/user/verify', 'POST', {code_val, phone}).then((response) => {
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

                showAlert(constantes.getMessage(error), false)


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
    return (<div>
        <div className='row' style={{marginRight: 5}}>
            <div className='col-md-6' id='left-login-dif' style={{textAlign: 'center', paddingTop: 50}}>
                <img src={img} alt='logo' height={350}/>
            </div>
            <div className='col-md-6 ' id='rigth-login-dif'>
                <div style={{paddingTop: 50, textAlign: 'left'}}>
                    <h1>Validez votre compte </h1>
                    <h5 style={{fontSize: 14, color: Colors.NOT_IMPORTANT}}>
                        Un code à 6 chiffres a été envoyé à votre adresse électronique ou à votre numéro de téléphone.</h5>
                </div>
                <br/>
                <div className='row'>
                    <div style={{textAlign: "left"}} className='col-md-12'>
                        <label className='labelInput'>Code dérification</label>
                        <input className='textInput3' value={code_val}
                               onChange={(e) => setCode_val(e.target.value)}
                               placeholder='Ex : 000000'/>
                    </div>

                    <div style={{textAlign: "left"}} className='col-md-12'>
                        {showMessageAlert ? <AlertMessage message={MessageAlert} type={TyAlert}/> : ``}
                        <div style={{flexDirection: "row", display: "flex", justifyContent: 'space-between'}}>
                            <div style={{paddingTop: 10}}>
                                <a>Vous avez pas un compte ?<br/> <Link to={'/login'}>Se connecter</Link></a>
                            </div>
                            <br/>
                            <div id='div-btn-creer-compte' style={{marginTop: 10}}>
                                <button type='submit' style={{marginRight: 12}} disabled={isSpin} onClick={login}
                                        className='button'>
                                    Vérifier {isSpin ? <Spin/> : ``} </button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </div>
        <br/><br/><br/>
        <Flooter/>
    </div>)
}

export default ValidateAccount