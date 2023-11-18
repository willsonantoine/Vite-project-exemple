import Images from "./Images.tsx";
import MenusItems from "./MenusItems.tsx";
import {Link} from "react-router-dom";
import {AiOutlineMenu} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {useState} from "react";
import {Drawer} from "antd";
import BoutonCreateOrLogin from "./BoutonCreateOrLogin.tsx";
import Colors from "./Colors.tsx";

function MennRoot() {
    const [open_menu, setOpen_menu] = useState(false);
    const [open_profil, setOpen_profil] = useState(false);
    function closeMenu() {
        setOpen_menu(false)
    }

    function closeProfil() {
        setOpen_profil(false)
    }
    const showMenu = () => {
        setOpen_menu(true);
    };
    const showProfil = () => {
        setOpen_profil(true);
    };
    const ImageH = () => {
        return (<div style={{display: "flex"}}>
            <img src={Images.logo} height={30} className='menu-logo' alt='Logo'/>
            <h5 style={{marginTop: 10, marginLeft: 5}}>Mlinzi System</h5>
        </div>)
    }

    return (
        <div className='bar-menu'>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{display: "flex", flexDirection: 'row'}}>
                    <img src={Images.logo} height={30} className='menu-logo' alt='Logo'/>
                    <h4 style={{marginTop: 9, marginLeft: 8, color: 'black'}}>Mlinzi System</h4>
                    <div className='menu-list'>
                        {
                            MenusItems.map(menu => (
                                <li className='menu-item'><Link to={menu.path}>{menu.title}</Link></li>
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
                title={<ImageH/>}
                placement='top'
                closable={false}
                onClose={closeMenu}
                open={open_menu}
                height={220}
            >
                <div className='menu-list-mobile' style={{marginLeft: -20}}>
                    {
                        MenusItems.map(menu => (
                            <li><Link to={menu.path} className='menu-item' onClick={closeMenu}>{menu.title}</Link></li>
                        ))
                    }
                    <BoutonCreateOrLogin/>
                </div>

            </Drawer>

            <Drawer
                title={<ImageH/>}
                placement='top'
                closable={false}
                onClose={closeProfil}
                open={open_profil}
                height={200}
            >
                <h4 style={{fontSize: 15, color: Colors.NOT_IMPORTANT}}>Pour bénéficier des nos services vous devez
                    avoir un compte actif</h4><br/>
                <BoutonCreateOrLogin/>
            </Drawer>
        </div>
    )
}

export default MennRoot;