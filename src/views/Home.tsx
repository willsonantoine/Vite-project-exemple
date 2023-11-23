import '../assets/styles/Home.css'
import '../assets/styles/index.css'
import Images from "../Components/Images.tsx";
import {Checkbox} from "antd";
import Colors from "../Components/Colors.tsx";
import BoutonCreateOrLogin from "../Components/BoutonCreateOrLogin.tsx";
import MenuRoot from "../Components/MenuRoot.tsx";
import Flooter from "../Components/Flooter.tsx";

function Home() {
    return (
        <>
            <div className='root-home'>
                <MenuRoot/>
                <div className="baniere">
                    <div className="row">
                        <div className="col-md-6" id="baniere-text">
                            <div style={{flexDirection: 'column'}}>
                                <h2 style={{color: Colors.NOT_IMPORTANT}}>Gérer en toute simplicité</h2>
                                <h5 style={{color: '#474747', fontSize: 14, fontFamily: 'inherit'}}>
                                    Simplifiez votre quotidien et atteignez vos objectifs avec notre application
                                    conviviale et pratique.</h5>
                                <br/>
                                <div style={{marginRight: 44}}>
                                    <BoutonCreateOrLogin/>
                                </div>
                                <br/>
                                <h6 style={{fontSize: 15, marginTop: 5, marginBottom: 10}}>
                                    Nos produits et services</h6>
                                <Checkbox checked={true} disabled={false} className='check-boutton-home'>
                                    Géstion de stock et facturation
                                </Checkbox><br/><br/>
                                <Checkbox checked={true} disabled={false} className='check-boutton-home'>
                                    Gestion de caisse (entrées et sorties)
                                </Checkbox><br/><br/>
                                <Checkbox checked={true} disabled={false} className='check-boutton-home'>
                                    Envoie et réception SMS avec SendName
                                </Checkbox><br/><br/>
                                <Checkbox checked={true} disabled={false} className='check-boutton-home'>
                                    Conception de systèmes informatiques
                                </Checkbox><br/><br/>
                                <Checkbox checked={true} disabled={false} className='check-boutton-home'>
                                    Conception et hébergement de sites web
                                </Checkbox><br/>
                            </div>
                            <br/>

                        </div>
                    </div>
                    <div className="col-md-6" id='imageBanier'>
                        <img src={Images.home_1} style={{height: '100%', maxHeight: 400}}/>
                    </div>
                </div>
                <Flooter/>
            </div>


        </>
    )
}

export default Home
