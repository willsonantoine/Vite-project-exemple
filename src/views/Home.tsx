import '../assets/styles/Home.css'
import '../assets/styles/index.css'
import Images from "../Components/Images.tsx";
import {AiOutlineMenu} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {Button, Checkbox, Drawer} from "antd";
import {useState} from "react";
import MenusItems from "../Components/MenusItems.tsx";
import Colors from "../Components/Colors.tsx";
import {useNavigate} from "react-router-dom";

function Home() {
    const [open_menu, setOpen_menu] = useState(false);
    const [open_profil, setOpen_profil] = useState(false);
    const navigate = useNavigate();
    const showMenu = () => {
        setOpen_menu(true);
    };
    const showProfil = () => {
        setOpen_profil(true);
    };

    function closeMenu() {
        setOpen_menu(false)
    }

    function closeProfil() {
        setOpen_profil(false)
    }

    return (
        <>
            <div className='root-home'>
                <div className='bar-menu'>
                    <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style={{display: "flex", flexDirection: 'row'}}>
                            <img src={Images.logo} height={30} className='menu-logo' alt='Logo'/>
                            <div className='menu-list'>
                                {
                                    MenusItems.map(menu => (
                                        <li className='menu-item'>{menu.title}</li>
                                    ))
                                }
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: 'row'}} className='menu-rigth'>
                            <div className="menu-icon" onClick={
                                showMenu
                            }><AiOutlineMenu/></div>
                            <div className="menu-icon-avatar" onClick={
                                showProfil
                            }><BiUserCircle/></div>
                        </div>

                    </div>

                </div>
                <div className="baniere">
                    <div className="row">
                        <div className="col-md-6" id="baniere-text">
                            <div style={{flexDirection: 'column'}}>
                                <h1>Surface Pro 9</h1>
                                <h6 style={{color: Colors.NOT_IMPORTANT, fontSize: 12, fontFamily: 'inherit'}}>
                                    Offrez à l’ensemble le parfait équilibre entre style sophistiqué, vitesse et
                                    puissance de traitement.</h6>
                                <br/>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <Button>Apropos du produit</Button>
                                    <Button style={{marginLeft: 20}}>Commander</Button>
                                </div>
                                <h6 style={{fontSize: 10, marginTop: 20, marginBottom: 10}}>Afficher les différent
                                    prix</h6>

                                <div style={{paddingLeft: 40}}>
                                    <Checkbox checked={true} disabled={false} style={{marginLeft: -40}}>
                                        Envoie SMS en chaque seconde sans interuption
                                    </Checkbox><br/>
                                    <Checkbox checked={true} disabled={false} style={{marginLeft: -40}}>
                                        Automatique send les loremspm
                                    </Checkbox><br/>
                                    <Checkbox checked={true} disabled={false} style={{marginLeft: -40}}>
                                        Tenir votre clientelle informée du monde
                                    </Checkbox><br/>
                                    <Checkbox checked={true} disabled={false} style={{marginLeft: -40}}>
                                        Tenir votre clientelle informée du monde
                                    </Checkbox><br/>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6" id='imageBanier'>
                            <img src={Images.home_1} style={{height: '100%', maxHeight: 400}}/>
                        </div>
                    </div>
                </div>

            </div>

            <Drawer
                title={<img src={Images.logo} height={30} className='menu-logo' alt='Logo'/>}
                placement='top'
                closable={false}
                onClose={closeMenu}
                open={open_menu}
                width={50}
            >
                <div className='menu-list-mobile' style={{marginLeft: -20}}>
                    {
                        MenusItems.map(menu => (
                            <li className='menu-item' onClick={closeMenu}>{menu.title}</li>
                        ))
                    }
                </div>
            </Drawer>

            <Drawer
                title={<img src={Images.logo} height={30} className='menu-logo' alt='Logo'/>}
                placement='top'
                closable={false}
                onClose={closeProfil}
                open={open_profil}
                height={200}
            >
                <h4 style={{fontSize: 15, color: Colors.NOT_IMPORTANT}}>Pour bénéficier des nos services vous devez
                    avoir un compte actif</h4><br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button>Créer un compte</Button>
                    <Button onClick={()=>navigate('/Login')}>Se connecter</Button>
                </div>
            </Drawer>
        </>
    )
}

export default Home
