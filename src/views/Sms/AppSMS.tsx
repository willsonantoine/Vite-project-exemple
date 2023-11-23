import Menus from "../../Components/Menus.tsx";
import {Button, Drawer, Input, Modal, Popover, Select} from "antd";
import {useEffect, useState} from "react";
import HttpRequest from "../../Controllers/HttpRequest.tsx";
import {Option} from "antd/es/mentions";
import constantes from "../../Controllers/Constantes.tsx";
import NotificationAlert from "../../Components/NotificationAlert.tsx";
import '../../assets/styles/SMS.css'
import {FaCheckCircle} from "react-icons/fa";
import {BiSolidError} from "react-icons/bi";
import Colors from "../../Components/Colors.tsx";
import Images from "../../Components/Images.tsx";
import {SiGooglemessages} from "react-icons/si";

const TextArea = Input;

const AppSMS = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenContact, setIsModalOpenContact] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const [isShowListContact, setIsShowListContact] = useState(false)

    const [showMessageAlert, setshowMessageAlert] = useState(false);
    const [MessageAlert, setMessageAlert] = useState('');
    const [TyAlert, setTypeAlert] = useState(false);
    const [total, setTotal] = useState(0);
    const [total_contact, setTotal_contact] = useState(0);
    const [solde, setSolde] = useState(0)

    const [ListMessages, setListMessage] = useState<CardMessage[]>([]);

    const [contacts, setContacts] = useState<CardContact[]>([])
    const [ListContact, setListContact] = useState([])
    const [messages, setMessages] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        loadContacts()
        LoadMessages();
    }, [])
    const loadContacts = () => {
        HttpRequest('/user/contacts?limit=1000&page=1', 'GET').then((response) => {

            setListContact(response.data.data.rows)
            setTotal_contact(response.data.data.count)
        }).catch((error) => {
            console.log(error);
        })

    }
    const showModal = () => {
        setIsShowPopup(false)
        setIsModalOpen(true);
    };

    const showModalContact = () => {
        setIsShowPopup(false)
        setIsModalOpenContact(true);
    };

    const SendSMS = () => {
        let i = 1;
        contacts.forEach((item) => {
            HttpRequest('/sms/send-local', 'POST', {phone: item, message: messages, isAlert: 0}).then((response) => {
                console.log(response);
                i++;
            }).catch((error) => {
                console.log(error);
            })
        })
        if (i === contacts.length) {
            setIsModalOpen(false);
            showAlert("Message envoyé avec succès", true);
            loadContacts();
            LoadMessages()
        }

    };
    const showAlert = (message: string, isAlert: boolean) => {
        setTypeAlert(isAlert)
        setshowMessageAlert(true)
        setMessageAlert(message)
    }
    const AddContacts = () => {

        HttpRequest('/user/contacts', 'POST', {phone: phone, name: name, bio: bio}).then((response) => {
            const data = response.data;
            if (data.status == 200) {
                showAlert(data.message, true);
                setIsModalOpenContact(false)
                loadContacts()
            }
        }).catch((error) => {
            showAlert("Une erreur s'est produite", true);
            console.log(error);
        })


    };

    const LoadMessages = () => {

        HttpRequest('/sms/load?page=1&limit=100', 'GET').then((response) => {
            const data = response.data;
            if (data.status == 200) {
                setTotal(response.data.data.response.count)
                setListMessage(response.data.data.response.rows)
                setSolde(response.data.data.solde.solde_sms | 0)
            }
        }).catch((error) => {
            showAlert("Une erreur s'est produite", false);
            console.log(error);
        })


    };

    function handleCancel() {
        setIsModalOpen(false);
    }

    function handleCancelContact() {
        setIsModalOpenContact(false);
    }

    const handleChange = (value: []) => {
        console.log(`selected ${value}`);
        setContacts(value);
    };

    const content = (
        <div>
            <Button style={{width: 200, marginBottom: 10}} onClick={showModal}>Envoyer un message</Button><br/>
            <Button style={{width: 200, marginBottom: 10}} onClick={showModalContact}>Nouveau contact</Button><br/>
            <Button style={{width: 200, marginBottom: 10}} onClick={showListContact}>Liste des contacts</Button>
        </div>
    );
    const CardNombre: React.FC<CardNombreProps> = ({numero, label}) => {
        return (
            <div className='card-nombre-facture-smal-sms' style={{marginTop: 4, height: 40}}>
                <div style={{fontSize: 6}}>{label}</div>
                <div style={{fontWeight: "bold"}}>{numero}</div>
            </div>
        );
    };
    const CardUserInfos: React.FC<CardMessage> = (item) => {
        return (
            <div style={{fontSize: 12, fontWeight: 'bold', flexDirection: 'column', marginLeft: 5}}>{item.user_to ?
                <div>
                    {item.user_to.name}
                    <div>{item.user_to.phone}</div>
                </div> : item.phone}</div>
        )
    }

    function closeListContact() {
        setIsShowListContact(false)
    }

    function showListContact() {
        setIsShowPopup(false)
        setIsShowListContact(true)
    }

    const CardContact: React.FC<CardContact> = (item) => {

        return (
            <div key={item.id}
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
                                <img src={Images.default_user_image} height={30} alt={''}/>
                            </div>
                            <div>
                                <span>{item.name ? item.name : 'Inconnue'}</span><br/>
                                <span style={{
                                    color: '#335676',
                                    fontSize: 12,
                                    fontWeight: 'bold'
                                }}> {item.user_contact.phone}</span>

                            </div>
                        </div>

                    </div>
                    <div>
                        <Button className='button-icon' style={{marginTop: 5, marginRight: 5}}>
                            <SiGooglemessages/> </Button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Menus/>
            <div style={{marginLeft: 10, marginTop: 10}}>
                <h5>Historique des messages</h5>
                <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', marginRight: 10}}>
                    {<CardNombre label='Solde SMS' numero={solde}/>}
                    {<CardNombre label='SMS Envoyés' numero={total}/>}
                    {<CardNombre label='Total contacts' numero={total_contact}/>}
                    <Popover placement="bottom" open={isShowPopup} title={<span>Options</span>} content={content}>
                        <Button style={{height: 40, marginTop: 5}} onClick={() => setIsShowPopup(true)}
                                className='button'>Options</Button>
                    </Popover>
                </div>
            </div>
            <div>
                {
                    showMessageAlert ?
                        <NotificationAlert message={MessageAlert} type={TyAlert}/> : ''
                }
                <div className='table-desktop'>
                    <table className="table header-border table-responsive-sm tbl-common">
                        <thead>
                        <tr>
                            <th>N °</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            ListMessages ?
                                ListMessages.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><strong>{i}</strong></td>
                                            <td>{item.phone}<br/>
                                                Ref:<strong>{item.reference}</strong></td>
                                            <td>{item.message}</td>
                                            <td>{(item.status) ? 'Success' : 'Error'}</td>
                                            <td>
                                                {constantes.formatDateString(item.createdAt)}<br/>
                                                {constantes.geDateFormat(item.createdAt)}
                                            </td>
                                        </tr>
                                    )
                                }) : ``
                        }
                        </tbody>
                    </table>
                </div>
                <div className='table-mobil'>
                    <div style={{marginTop: 10}}>
                        {ListMessages ? ListMessages.map((item: CardMessage, i) => {
                            return (
                                <div style={{backgroundColor: 'white', marginBottom: 10, minHeight: 70, padding: 5}}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <div
                                            style={{display: "flex", flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <div>
                                                <CardUserInfos user_to={item.user_to} phone={item.phone}
                                                               createdAt={item.createdAt} message={item.message}
                                                               reference={item.reference} status={item.status}/>
                                            </div>

                                        </div>
                                        <div>
                                            <span>Ref:<strong>{item.reference}</strong></span> <span
                                            style={{
                                                backgroundColor: Colors.NOT_IMPORTANT,
                                                borderRadius: 5,
                                                padding: 2,
                                                color: "white"
                                            }}>{i}</span>
                                            <span
                                                style={{color: item.status ? 'green' : 'red'}}>{item.status ?
                                                <FaCheckCircle/> :
                                                <BiSolidError/>}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{color: '#707D75'}}><br/>{item.message}</span>
                                        <br/>
                                        <span
                                            style={{color: "#71A7E1"}}>{constantes.formatDateString(item.createdAt)};
                                            {constantes.geDateFormat(item.createdAt)}</span>
                                    </div>

                                </div>)
                        }) : ``}
                    </div>
                </div>
            </div>

            <Modal title="Envoyer un message" open={isModalOpen}
                   footer={null} onCancel={handleCancel}>
                <div className='text-input-group'>
                    <label>Liste des numéro</label>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={handleChange}
                        className='textInput3'

                    >
                        {
                            ListContact ?
                                ListContact.map((option:any) => {
                                    return <Option
                                        value={option.user_contact.phone}>{option.name} ({option.user_contact.phone})</Option>
                                }) : ``
                        }
                    </Select>
                </div>
                <div className='text-input-group'>
                    <label>Message</label>
                    <TextArea value={messages} onChange={(e) => {
                        setMessages(e.target.value)
                    }} className='textInput2' placeholder=""/>
                </div>
                <br/>
                <Button className='button' onClick={SendSMS}>Envoyer</Button>
            </Modal>

            <Modal title="Contact" open={isModalOpenContact}
                   footer={null} onCancel={handleCancelContact}>

                <div className='text-input-group'>
                    <label>Nom complet</label>
                    <Input className='textInput2' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='text-input-group'>
                    <label>Numéro de télephone</label>
                    <Input type='phone' value={phone} onChange={(e) => setPhone(e.target.value)}
                           className='textInput2'/>
                </div>
                <div className='text-input-group'>
                    <label>Bio</label>
                    <TextArea value={bio} onChange={(e) => {
                        setBio(e.target.value)
                    }} className='textInput2' placeholder=""/>
                </div>
                <br/>
                <Button className='button' onClick={AddContacts}>Ajouter</Button>
            </Modal>
            <Drawer

                placement='bottom'
                closable={false}
                onClose={closeListContact}
                open={isShowListContact}
                height={'78%'}
            >

                <div>
                    <span>Liste des contacts</span>
                    <div>
                        {
                            ListContact ?
                                ListContact.map((contact:any) => {
                                    return <CardContact name={contact.name} phone={contact.phone} id={contact.id}
                                                        user_contact={contact.user_contact}/>
                                }) : ``
                        }
                    </div>
                </div>

            </Drawer>
        </div>
    )
}


export default AppSMS