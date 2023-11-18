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

const CreateAccount = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [showMessageAlert, setshowMessageAlert] = useState(false);
    const [MessageAlert, setMessageAlert] = useState('');
    const [TyAlert, setTypeAlert] = useState(false);
    const [isSpin, setSpin] = useState(false);

    useEffect(() => {

    }, [])

    const login = async () => {
        if (name !== null && phone !== '' && email !== '') {
            setSpin(true)
            HttpRequest('/user/create', 'POST', {name, phone, email}).then((response) => {
                const data = response.data;
                if (data.status == 201) {
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('phone', phone);
                    navigate('/validate-account')
                    setSpin(false)
                }
                showAlert(data.message, (data.status == 201))
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
                    <h1>Mlinzi System</h1>
                    <h5 style={{fontSize: 14, color: Colors.NOT_IMPORTANT}}>
                        Notre systèm vous accompagne au quotidien pour atteindre vos objectifs. Que vous soyez une
                        petite entreprise ou une grande organisation</h5>
                </div>
                <br/>
                <div className='row'>
                    <div style={{textAlign: "left"}} className='col-md-12'>
                        <label className='labelInput'>Non complet</label>
                        <input className='textInput3' value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder='Votre nom complet'/>
                    </div>
                    <div style={{textAlign: "left"}} className='col-md-12'>
                        <label className='labelInput'>Numéro de téléphone</label>
                        <input className='textInput3' value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                               placeholder='Votre numéro de téléphone'/>

                    </div>
                    <div style={{textAlign: "left"}} className='col-md-12'>
                        <label className='labelInput'>Address Email</label>
                        <input className='textInput3' value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder='Votre email'/>

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
                                    Créer {isSpin ? <Spin/> : ``} </button>
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

export default CreateAccount