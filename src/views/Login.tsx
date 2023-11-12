import {useState} from "react";
import img from '../assets/login-1.jpg'
const Login = () => {
    const [username, setUsername] = useState('');

    return (<div className='row'>
        <div className='col-md-6' id='left-login-dif' style={{textAlign: 'center', paddingTop: 50}}>
            <img src={img} alt='logo' height={350}/>
        </div>
        <div className='col-md-6 ' id='rigth-login-dif'>
            <div style={{paddingTop: 50, textAlign: 'left'}}>
                <h1>E'eka System</h1>
                <h5 style={{fontSize: 14}}>Un system qui facilite la vie</h5>
            </div>
            <br/>
            <div style={{textAlign: "left"}}>
                <label className='labelInput'>Non d'utilisateur</label>
                <input className='textInput' value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       type='text' placeholder='Username' id='username'/>
            </div>
            <div style={{textAlign: "left"}}>
                <label className='labelInput'>Non d'utilisateur</label>
                <input className='textInput' value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       type='text' placeholder='Username' id='username'/>
            </div>
            <div style={{flexDirection: "row", display: "flex", justifyContent: 'space-between'}}>
                <div style={{textAlign: "left", paddingTop: 10}}>
                    <a>Vous n'avez pas un compte ? Créer un compte</a>
                </div>
                <div id='div-btn-seconnecter'>
                    <button type='submit' className='button'>Se connecter</button>
                </div>
            </div>

        </div>
    </div>)
}

export default Login