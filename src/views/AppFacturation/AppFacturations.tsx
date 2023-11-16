import '../../assets/styles/RootApp.css'
import Menus from "../../Components/Menus.tsx";
import '../../assets/styles/AppProduit.css'
import '../../assets/styles/Facturation.css'

import {useEffect, useState} from "react";
import HttpRequest from "../../Controllers/HttpRequest.tsx";
import {Button, Drawer, Input, Modal} from "antd";
import CreatableSelect from "react-select/creatable";
import Images from "../../Components/Images.tsx";
import Search from "antd/es/input/Search";
import {IoIosAddCircleOutline} from "react-icons/io";
import {MdDelete, MdEditNote} from "react-icons/md";
import Invoice from "./Invoice.tsx";


function AppFacturations() {

    const [ListProduits, setListProduits] = useState([]);
    const [ListProduitsCurrent, setListProduitsCurrent] = useState([]);
    const [ListClients, setListClients] = useState([])
    const [ListFactures, setListFactures] = useState<FactureInterface[]>([])
    const [panier, setPanier] = useState<CardPanier[]>([]);
    const [total_general, setTotalGeneral] = useState(0);
    const [numero, setNumero] = useState(0);
    const [clientName, setClientName] = useState('CLIENT ORDINAIRE');
    const [currency, setCurrency] = useState('USD');
    const [modalUpdateProduito, setModalUpdate] = useState(false);
    const [Facture, setFacture] = useState({});

    const [currentIndexProduit, setCurrentIndex] = useState(0);
    const [currentNameProduit, setCurrentNameProduit] = useState('')
    const [currentQteProduit, setCurrentQteProduit] = useState(0)
    const [currentPrixProduit, setCurrentPrixProduit] = useState(0)

    const [open_listProduit, setOpenListProduit] = useState(false);
    const [open_printInvoice, setOpenPrintInvoice] = useState(false);

    useEffect(() => {
        load_produits();
        getProduitsFromLocalStorage()
        calculateTotal()
        loadAllFactures();
    }, [panier, ListFactures])

    const loadAllFactures = () => {
        const data = localStorage.getItem('factures')
        if (data) {
            setListFactures(JSON.parse(data));
        }
    }

    const getProduitsFromLocalStorage = () => {
        const data: string | any = localStorage.getItem('produits');
        const listProduit = JSON.parse(data);
        setListProduits(listProduit)
        setListProduitsCurrent(listProduit)
    }

    const load_produits = () => {
        HttpRequest('/app/produits/load?limit=10&page=1', 'GET').then(response => {
            if (response.data.status === 200) {
                localStorage.setItem('produits', JSON.stringify(response.data.data.rows))
            }
        }).catch(error => {
            console.error(error)
        })
    }

    function changeClientName(name) {
        console.log(name.value)
        setClientName(name.value)
    }

    function closeListProduit() {
        setOpenListProduit(false)
    }

    const constSaveFacture = () => {
        const facture: FactureInterface = {
            client_name: clientName,
            amount: total_general,
            currency: currency,
            number: ListFactures.length + 1,
            date: new Date().toISOString(),
            details: panier
        }
        setNumero(facture.number)
        setFacture(facture)
        ListFactures.push(facture);
        open_pintInvoice()
        localStorage.setItem('factures', JSON.stringify(ListFactures))

        setPanier([])
        setClientName('CLIENT ORDINAIRE')

    }

    const close_printInvoice = () => {
        setOpenPrintInvoice(false)
    }

    const open_pintInvoice = () => {
        setOpenPrintInvoice(true)
    }
    const CardPanier: React.FC<CardPanier> = ({index, name, qte, prix, prix_total}) => {
        return (
            <div className='card-panier-mobile' onClick={() => openModalUpdateLine(index, name, qte, prix)}>
                <div style={{
                    marginLeft: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 7,
                    justifyContent: 'space-between',
                    marginRight: 10
                }}>
                    <div>
                        <span style={{fontSize: 16, fontWeight: 'bold'}}>{name}</span><br/>
                        <span style={{fontSize: 16, fontWeight: 'bold', color: '#292D3E'}}>Qte : {qte}</span>
                    </div>
                    <div>
                        <span style={{fontSize: 16, fontWeight: 'bold'}}>Prix. {prix}</span><br/>
                        <span style={{fontSize: 16}}>Total : {prix_total}</span>
                    </div>

                </div>
            </div>
        );
    };
    const CardNombre: React.FC<CardNombreProps> = ({numero, label}) => {
        return (
            <div className='card-nombre-facture'>
                <div style={{fontSize: 12}}>{label}</div>
                <div style={{fontWeight: "bold"}}>{numero}</div>
            </div>
        );
    };
    const CardListProduit: React.FC<CardProduitList> = ({name, prix_min, id, prix_max}) => {

        return (
            <div key={id}
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
                                <img src={Images.default_product} height={30} alt={name}/>
                            </div>
                            <div>
                                <h5>{name}</h5>
                                <h6 style={{color: '#335676', fontSize: 12}}>Prix Min {prix_min} USD;
                                    Max {prix_max} USD</h6>
                            </div>
                        </div>

                    </div>
                    <div>
                        <Button className='button-icon' style={{marginTop: 10, marginRight: 5}}
                                onClick={() => {
                                    AddPanier(name, prix_max, 1);
                                    closeListProduit()
                                }}>
                            <IoIosAddCircleOutline/> </Button>
                    </div>
                </div>
            </div>
        )
    }


    const CardSearch = (<Search placeholder="Recherer le produit" onChange={(e) => onChageSearch(e.target.value)}
                                style={{width: '100%'}}/>)

    function OpenListProduit() {
        setOpenListProduit(true)
    }

    const onChageSearch = (searchText: string) => {
        const list = ListProduits.filter((item: any) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        if (list) {
            setListProduitsCurrent(list)
        } else {
            setListProduitsCurrent(ListProduits)
        }

    }

    const AddPanier = (name: string, prix: number, qte: number) => {
        const existingProductIndex = panier.findIndex(
            (item) => item.name === name && item.prix === prix
        );

        if (existingProductIndex !== -1) {
            // Le produit existe déjà au même prix, mettez à jour la quantité et le prix total
            const updatedPanier = [...panier];
            updatedPanier[existingProductIndex].qte += qte;
            updatedPanier[existingProductIndex].prix_total +=
                updatedPanier[existingProductIndex].prix;
            setPanier(updatedPanier);
        } else {
            // Le produit n'existe pas encore, ajoutez une nouvelle ligne au panier
            setPanier([
                ...panier,
                {
                    index: panier.length + 1,
                    name: name,
                    prix: prix,
                    qte: qte,
                    prix_total: prix,
                },
            ]);
        }
        calculateTotal()

    };
    const UpdatePanier = (index: number, name: string, prix: number, qte: number) => {
        const existingProductIndex = panier.findIndex(
            (item) => item.index === index
        );

        if (existingProductIndex !== -1) {
            // Le produit existe déjà au même prix, mettez à jour la quantité et le prix total
            const updatedPanier = [...panier];
            updatedPanier[existingProductIndex].qte = qte;
            updatedPanier[existingProductIndex].prix = prix
            updatedPanier[existingProductIndex].prix_total = qte * prix;
            setPanier(updatedPanier);
        }
        calculateTotal()

    };
    const RemoveFromPanier = (index: number) => {
        const updatedPanier = panier.filter((_item) => _item.index !== index);
        setPanier(updatedPanier);
        calculateTotal()
    };
    const calculateTotal = () => {
        let total = 0;
        for (const item of panier) {
            total += item.prix_total;
        }
        setTotalGeneral(total)
    };
    const cancelUpdateLine = () => {
        setModalUpdate(false)
    }
    const openModalUpdateLine = (index: number, name: string, qte: number, prix: number) => {
        setCurrentIndex(index);
        setCurrentNameProduit(name)
        setCurrentQteProduit(qte)
        setCurrentPrixProduit(prix)
        setModalUpdate(true)
    }
    return (
        <div className='root-home'>
            <Menus/>
            <div style={{marginLeft: 5, backgroundColor: '#E9E9E9', paddingBottom: 5, marginRight: 5}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <CardNombre numero={ListFactures.length} label={'N°'}/>
                        <CardNombre numero={total_general} label={'Total ' + currency}/>
                    </div>
                    <div><
                        Button className='button' id='buttonPrint-mobile'
                               onClick={constSaveFacture} disabled={panier.length == 0}>Imprimer</Button></div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div className='button-print-mobile'>
                            <CreatableSelect placeholder='Selectionner le client' className='textInput2'
                                             id='client-name'
                                             onChange={changeClientName}
                                             isClearable options={ListClients}/>
                        </div>
                        <div>
                            <Button className='button' id='buttonPrint-desktop'
                                    onClick={constSaveFacture} disabled={panier.length == 0}>Imprimer</Button>
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
            <div className='panier-mobile'>
                <div>
                    {panier.map((item) => {
                        return <div>
                            {<CardPanier name={item.name} prix={item.prix} prix_total={item.prix_total}
                                         index={item.index} qte={item.qte}/>}
                        </div>
                    })}
                </div>
            </div>
            <div className='panier-desktop'>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className='col-md-8'>
                        <table className="table header-border table-responsive-sm tbl-common">
                            <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nom</th>
                                <th>Qte</th>
                                <th>Prix</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                panier.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><strong>{item.index}</strong></td>
                                            <td style={{fontWeight: 'bold'}}>{item.name}</td>
                                            <td>{item.qte}</td>
                                            <td>{item.prix}</td>
                                            <td>{item.prix_total}</td>
                                            <td>
                                                <div className='btn-group'>
                                                    <Button className='button-icon'
                                                            onClick={() => openModalUpdateLine(item.index, item.name, item.qte, item.prix)}><MdEditNote/></Button>
                                                    <Button className='button-icon' style={{color: 'red'}}
                                                            onClick={() => RemoveFromPanier(item.index)}>
                                                        <MdDelete/> </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-4'>
                        <div style={{marginTop: 4}}>
                            {CardSearch}
                        </div>
                        <div style={{marginTop: 5}}>
                            {ListProduitsCurrent.map((item: any, i) => {
                                return (<CardListProduit id={item.id} name={item.name} prix_max={item.prix_max}
                                                         prix_min={item.prix_min}/>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                title={CardSearch}
                placement='bottom'
                closable={false}
                onClose={closeListProduit}
                open={open_listProduit}
                height={'73%'}
            >
                {ListProduitsCurrent.map((item: any, i) => {
                    return (<CardListProduit key={i} id={item.id} name={item.name} prix_max={item.prix_max}
                                             prix_min={item.prix_min}/>)
                })}


            </Drawer>

            <Drawer
                title={<h5>FACTURE #{numero}</h5>}
                placement='bottom'
                closable={false}
                onClose={close_printInvoice}
                open={open_printInvoice}
                height={'73%'}
            >

                <Invoice facture={Facture}/>

            </Drawer>

            <Modal title={currentNameProduit} open={modalUpdateProduito}
                   onCancel={cancelUpdateLine} footer={null}>
                <div className='row'>
                    <div className="form-group col-md-4">
                        <label>Quantité</label>
                        <Input value={currentQteProduit}
                               onChange={(e) => setCurrentQteProduit(e.target.value ? parseFloat(e.target.value) : 0)}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Prix unitaire</label>
                        <Input value={currentPrixProduit}
                               onChange={(e) => setCurrentPrixProduit(e.target.value ? parseFloat(e.target.value) : 0)}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Prix total</label>
                        <Input value={(currentPrixProduit * currentQteProduit)}
                        />
                    </div>
                    <div className="form-group col-md-12" style={{textAlign: 'center'}}>
                        <Button className='button' style={{backgroundColor: 'red'}}
                                onClick={() => {
                                    RemoveFromPanier(currentIndexProduit);
                                    cancelUpdateLine()
                                }}>Supprimer</Button>
                        <Button className='button'
                                onClick={() => {
                                    UpdatePanier(currentIndexProduit, currentNameProduit, currentPrixProduit, currentQteProduit);
                                    cancelUpdateLine()
                                }}>Modifier</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AppFacturations