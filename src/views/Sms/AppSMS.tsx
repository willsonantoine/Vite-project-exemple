import Menus from "../../Components/Menus.tsx";
import { Button, DatePicker, Input, Modal, Popover, Select, Space } from "antd";
import AppTableProduis from "../AppProduits/AppTableProduit.tsx";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import HttpRequest from "../../Controllers/HttpRequest.tsx";
import { Option } from "antd/es/mentions";
import AlertMessage from "../../Components/NotificationAlert.tsx";

const TextArea = Input;

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',

    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },]

const AppSMS = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenContact, setIsModalOpenContact] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const [showMessageAlert, setshowMessageAlert] = useState(false);
    const [MessageAlert, setMessageAlert] = useState('');
    const [TyAlert, setTypeAlert] = useState(false);

    const [options, setOptions] = useState([]);
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        loadContacts()
    }, [])
    const loadContacts = () => {
        HttpRequest('/user/contacts', 'GET').then((response) => {
            const data = response.data.data.rows;
            setOptions(data);
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
        contacts.forEach((item: any) => {
            HttpRequest('/sms/send-local', 'POST', { phone: item, message: messages, isAlert: 0 }).then((response) => {
                console.log(response);
                i++;
            }).catch((error) => {
                console.log(error);
            })
        })
        if (i === contacts.length) {
            setIsModalOpen(false);
        }

    };
    const showAlert = (message: string, isAlert: boolean) => {
        setTypeAlert(isAlert)
        setshowMessageAlert(true)
        setMessageAlert(message)
    }
    const AddContacts = () => {

        HttpRequest('/user/contacts', 'POST', { phone: phone, name: name, bio: bio }).then((response) => {
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
            <Button style={{ width: 200, marginBottom: 10 }} onClick={showModal}>Envoyer un message</Button><br />
            <Button style={{ width: 200, marginBottom: 10 }} onClick={showModalContact}>Contacts</Button>
        </div>
    );
    return (
        <div>
            <Menus />
            <div style={{ marginLeft: 10, marginTop: 10 }}>
                <h5>Liste des produits</h5>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <DatePicker />
                    <Popover placement="bottom" open={isShowPopup} title={<span>Options</span>} content={content}>
                        <Button onClick={() => setIsShowPopup(true)} className='button'>Options</Button>
                    </Popover>
                </div>
            </div>
            {showMessageAlert ? <AlertMessage message={MessageAlert} type={TyAlert} /> : ``}
            <br />
            <AppTableProduis columns={columns} data={dataSource} />

            <Modal title="Envoyer un message" open={isModalOpen}
                footer={null} onCancel={handleCancel}>
                <div className='text-input-group'>
                    <label>Liste des numéro</label>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={handleChange}
                        className='textInput3'

                    >
                        {
                            options.map((option: any) => {
                                return <Option
                                    value={option.user_contact.phone}>{option.name} ({option.user_contact.phone})</Option>
                            })
                        }
                    </Select>
                </div>
                <div className='text-input-group'>
                    <label>Message</label>
                    <TextArea value={messages} onChange={(e) => {
                        setMessages(e.target.value)
                    }} className='textInput2' placeholder="" />
                </div>
                <br />
                <Button className='button' onClick={SendSMS}>Envoyer</Button>
            </Modal>

            <Modal title="Contact" open={isModalOpenContact}
                footer={null} onCancel={handleCancelContact}>

                <div className='text-input-group'>
                    <label>Nom complet</label>
                    <Input className='textInput2' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='text-input-group'>
                    <label>Numéro de télephone</label>
                    <Input type='phone' value={phone} onChange={(e) => setPhone(e.target.value)}
                        className='textInput2' />
                </div>
                <div className='text-input-group'>
                    <label>Bio</label>
                    <TextArea value={bio} onChange={(e) => {
                        setBio(e.target.value)
                    }} className='textInput2' placeholder="" />
                </div>
                <br />
                <Button className='button' onClick={AddContacts}>Ajouter</Button>
            </Modal>
        </div>
    )
}


export default AppSMS