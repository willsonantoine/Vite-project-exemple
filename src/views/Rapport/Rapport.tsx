import Menus from "../../Components/Menus.tsx";
import {useEffect, useState} from "react";
import HttpRequest from "../../Controllers/HttpRequest.tsx";
import constantes from "../../Controllers/Constantes.tsx";
import '../../assets/styles/RapportVente.css'
import {Drawer, Modal} from "antd";

function AppRapportFactures() {

    const [ListFactures, setListFactures] = useState([])
    const [date, setDate] = useState(constantes.getCurrentDate());
    const [total, setTotal] = useState(0);
    const [open_detailles, setOpen_detailles] = useState(false)
    const [numero, setNumero] = useState('');
    const [client_name, setClient_name] = useState('');
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('')
    const [date_facture, setDate_facture] = useState('')
    const [date_facture_interval, setDate_facture_interval] = useState('')
    const [open_modal_details, setOpen_modal_details] = useState(false)
    const [details, setDetails] = useState([])

    useEffect(() => {
        loadFacturesCloud();
    }, [date,numero])

    function openDetails(item: any) {
        setNumero(item.facture.number);
        setClient_name(item.facture.Client.name);
        setAmount(item.facture.amount);
        setCurrency(item.facture.currency);
        setDate_facture(constantes.formatDateString(item.facture.date_facture))
        setDate_facture_interval(constantes.geDateFormat(item.facture.date_facture))
        setDetails(item.details)
        setOpen_detailles(true);
    }

    const onChangeDate = (value:string) => {
        setDate(value);
        loadFacturesCloud();
    }

    function close_modal_details() {
        setOpen_modal_details(false);
    }

    function openDetailsModal(item: any) {
        setNumero(item.facture.number);
        setClient_name(item.facture.Client.name);
        setAmount(item.facture.amount);
        setCurrency(item.facture.currency);
        setDate_facture(constantes.formatDateString(item.facture.date_facture))
        setDate_facture_interval(constantes.geDateFormat(item.facture.date_facture))
        setDetails(item.details)
        setOpen_modal_details(true);
    }

    function closeDetails() {
        setOpen_detailles(false);
    }

    const loadFacturesCloud = () => {

        const id_service = constantes.getIdService();
        HttpRequest(`/app/factures/load/${id_service}/${date}`, 'GET').then(response => {
            const data = response.data;
            if (data.status == 200) {
                setListFactures(data.data.rows);
                setTotal(data.data.total)
            }

        }).catch(err => {
            console.log(err.message)
        })
    }

    const CardNombre: React.FC<CardNombreProps> = ({numero, label}) => {
        return (
            <div className='card-nombre-facture-smal'>
                <div style={{fontSize: 12}}>{label}</div>
                <div style={{fontWeight: "bold"}}>{numero}</div>
            </div>
        );
    };
    const DetailsFacture = () => {
        return (
            <div>
                Client : <span style={{fontWeight: 'bold'}}>{client_name}</span><br/>
                Date : <span style={{fontWeight: 'bold'}}>{date_facture}; {date_facture_interval}</span><br/>
                Montant :<span style={{fontWeight: 'bold'}}> {amount} {currency}</span>

                <div className="details">
                    <table className="bordered-table">
                        <thead>
                        <tr>
                            <th>Designation</th>
                            <th>P.U</th>
                            <th>Qte</th>
                            <th>P.T</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{item.Produit.name}</td>
                                <td>{item.prix}</td>
                                <td>{item.qte}</td>
                                <td>{(item.qte * item.prix)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    return (
        <div className='root-home'>
            <Menus/>
            <h5>Rapport</h5>
            <div style={{display: "flex"}}>
                <div className='form-group' style={{width: 200, marginLeft: 5}}>
                    <label>Date</label>
                    <input
                        type="date"
                        className="textInputBorder"
                        value={date}
                        onChange={(e) => onChangeDate(e.target.value)}
                    />
                </div>
                {<CardNombre label='Total' numero={total}/>}
            </div>
            <div className='table-large'>
                <table className="table header-border table-responsive-sm tbl-common">
                    <thead>
                    <tr>
                        <th>N °</th>
                        <th>Client</th>
                        <th>Montant</th>
                        <th>Devise</th>
                        <th>Date</th>
                        <th>Panier</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ListFactures ?
                            ListFactures.map((item: any, i) => {
                                return (
                                    <tr key={i} onClick={() => openDetailsModal(item)}>
                                        <td><strong>{item.facture.number}</strong></td>
                                        <td>{item.facture.Client.name}</td>
                                        <td>{item.facture.amount}</td>
                                        <td>{item.facture.currency}</td>
                                        <td>
                                            {constantes.formatDateString(item.facture.date_facture)}<br/>
                                            {constantes.geDateFormat(item.facture.date_facture)}
                                        </td>
                                        <td><span
                                            style={{
                                                backgroundColor: '#71A7E1',
                                                padding: 2,
                                                borderRadius: 9,
                                                color: "white"
                                            }}>Papnier {item.details.length}</span>
                                        </td>
                                    </tr>
                                )
                            }) : ``
                    }
                    </tbody>
                </table>
            </div>
            <div className='table-mobile-rapport'>
                <div>
                    {
                        ListFactures ?
                            ListFactures.map((item: any, i) => {
                                return (
                                    <div key={i} className='card-rapport-vente-mobile'
                                         onClick={() => openDetails(item)}>
                                        <div>
                                        <span
                                            style={{
                                                backgroundColor: '#2E2E37',
                                                color: 'white',
                                                padding: 3,
                                                minWidth: 50
                                            }}>{item.facture.number}</span>
                                            <span
                                                style={{
                                                    color: 'black',
                                                    marginLeft: 5
                                                }}>{item.facture.Client.name}</span><br/>
                                            <h6 style={{
                                                color: '#666666',
                                                marginTop: 5,
                                                marginLeft: 5
                                            }}>{constantes.formatDateString(item.facture.date_facture)}; {constantes.geDateFormat(item.facture.date_facture)}</h6>
                                        </div>
                                        <div>
                                            <div>
                                                <strong
                                                    style={{fontSize: 19}}>{item.facture.amount}</strong> {item.facture.currency}<br/>
                                                <span
                                                    style={{
                                                        backgroundColor: '#35597B',
                                                        color: 'white',
                                                        padding: 3,
                                                        fontSize: 12,
                                                        borderRadius: 10,
                                                        marginRight: 2
                                                    }}>Produits ({item.details.length})</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : ``
                    }
                </div>
            </div>
            <Drawer
                title={<h5>FACTURE #{numero}</h5>}
                placement='bottom'
                closable={false}
                onClose={closeDetails}
                open={open_detailles}
                height={'73%'}
            >

                <DetailsFacture/>
            </Drawer>

            <Modal title={<h5>FACTURE #{numero}</h5>} open={open_modal_details}
                   onCancel={close_modal_details} footer={null}>
                <DetailsFacture/>

            </Modal>
        </div>
    )
}

export default AppRapportFactures;