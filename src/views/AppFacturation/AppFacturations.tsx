import '../../assets/styles/RootApp.css'
import Menus from "../../Components/Menus.tsx";
import '../../assets/styles/AppProduit.css'
import '../../assets/styles/Facturation.css'

import {useEffect, useState} from "react";
import HttpRequest from "../../Controllers/HttpRequest.tsx";
import {Button, Drawer} from "antd";
import CreatableSelect from "react-select/creatable";
import Images from "../../Components/Images.tsx";
import Search from "antd/es/input/Search";
import {IoIosAddCircleOutline} from "react-icons/io";

interface CardNombreProps {
    numero: number;
    label: string
}

function AppFacturations() {

    const [ListProduits, setListProduits] = useState([]);
    const [ListClients, setListClients] = useState([])

    const [open_listProduit, setOpenListProduit] = useState(false);

    useEffect(() => {
        load_produits();
    }, [])

    const load_produits = () => {
        HttpRequest('/app/produits/load?limit=10&page=1', 'GET').then(response => {
            setListProduits(response.data.data.rows)
            console.log(ListProduits)
        }).catch(error => {
            console.error(error)
        })
    }

    function changeClientName(name) {
        console.log(name)
    }

    function closeListProduit() {
        setOpenListProduit(false)
    }

    const CardNombre: React.FC<CardNombreProps> = ({numero, label}) => {
        return (
            <div className='card-nombre-facture'>
                <div style={{fontSize: 12}}>{label}</div>
                <div style={{fontWeight: "bold"}}>{numero}</div>
            </div>
        );
    };
    const onSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const searchText = event.target.value;
        // Logique de recherche à implémenter ici
        console.log('Recherche effectuée avec le texte :', searchText);
    }

    function OpenListProduit() {
        setOpenListProduit(true)
    }

    return (
        <div className='root-home'>
            <Menus/>
            <div style={{marginLeft: 5, backgroundColor: '#E9E9E9', paddingBottom: 5, marginRight: 5}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <CardNombre numero={50000} label={'N°'}/>
                        <CardNombre numero={5000000} label={'Total USD'}/>
                        <CardNombre numero={5000000} label={'Total CDF'}/>
                    </div>
                    <div><Button className='button' id='buttonPrint-mobile'>Imprimer</Button></div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div className='button-print-mobile'>
                            <CreatableSelect placeholder='Selectionner le client' className='textInput2'
                                             id='client-name'
                                             onChange={changeClientName}
                                             isClearable options={ListClients}/>

                        </div>
                        <div>
                            <Button className='button' id='buttonPrint-desktop'>Imprimer</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='entete-panier'>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div><CreatableSelect placeholder='Selectionner le client' className='textInput2'
                                          id='client-name-mobile'
                                          onChange={changeClientName}
                                          isClearable options={ListClients}/>
                    </div>
                    <Button className='button' style={{marginTop: 9, marginRight: 6}}
                            onClick={() => OpenListProduit()}>Produits</Button>
                </div>
            </div>

            <Drawer
                title={<Search placeholder="Recherer le produit" onSearch={()=>onSearch} style={{ width: '100%' }} />}
                placement='bottom'
                closable={false}
                onClose={closeListProduit}
                open={open_listProduit}
                height={'73%'}
            >
                {ListProduits.map((item:any, i) => {
                    return (<div key={i}
                                 style={{
                                     backgroundColor: "#F3F3F3",
                                     borderRadius: 5,
                                     marginTop: 5,
                                     height: 50
                                 }}>
                        <div style={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                    <div style={{textAlign: 'center', marginTop: 5, marginRight: 5}}>
                                        <img src={Images.default_product} height={30} alt={item.name}/>
                                    </div>
                                    <div>
                                        <h5>{item.name}</h5>
                                        <h6 style={{color:'#335676'}}>Prix Min {item.prix_min} USD; Max {item.prix_max} USD</h6>
                                    </div>

                                </div>

                            </div>
                            <div>
                                <Button className='button-icon' style={{marginTop: 10, marginRight: 5}}
                                        onClick={() => {}}>
                                    <IoIosAddCircleOutline /> </Button>
                            </div>
                        </div>
                    </div>)
                })}


            </Drawer>
        </div>
    )
}

export default AppFacturations