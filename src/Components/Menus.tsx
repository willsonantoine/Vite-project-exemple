import Images from "./Images.tsx";
import MenusRootApp from "./MenusRootApp.tsx";
import {AiOutlineMenu} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {Button, Drawer} from "antd";
import Colors from "./Colors.tsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Menus() {
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
        <div className='bar-menu'>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{display: "flex", flexDirection: 'row'}}>
                    <img src={Images.logo} height={30} className='menu-logo' alt='Logo'/>
                    <div className='menu-list'>
                        {
                            MenusRootApp.map(menu => (
                                <li className='menu-item'>
                                    <Link to={menu.path}>{menu.title}</Link>
                                </li>
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
                        MenusRootApp.map(menu => (
                            <li className='menu-item' onClick={closeMenu}>
                                <Link to={menu.path}>{menu.title}</Link>
                            </li>
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
                    <Button onClick={() => navigate('/Login')}>Se connecter</Button>
                </div>
            </Drawer>
        </div>
    )
}

export default Menus;