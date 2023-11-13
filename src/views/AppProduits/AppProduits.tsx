import '../../assets/styles/RootApp.css'
import Menus from "../../Components/Menus.tsx";
import {
    Button,
    DatePicker,
    Input,
    InputNumber,
    Modal,
    Popover,
    Select, Space,
    Upload,
    UploadFile,
    UploadProps
} from "antd";
import {useEffect, useState} from "react";
import ImgCrop from 'antd-img-crop';
import {RcFile} from "antd/es/upload";
import AppTableProduis from "./AppTableProduit.tsx";
import {ColumnsType} from "antd/es/table";
import HttpRequest from "../../Controllers/HttpRequest.ts";
import {Option} from "antd/es/mentions";

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
    },
]

function AppProduits() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [name, setName] = useState('')
    const [categorie, setCategorie] = useState('')
    const [prix_min, setPrixMin] = useState('')
    const [prix_max, setPrixMax] = useState('')
    const [qte_min, setQteMin] = useState(0)
    const [description, setDescription] = useState('')
    const [listCategorie, setListCategorie] = useState([])

    const onChangeImage: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    const {TextArea} = Input;
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    useEffect(() => {
        load_produits()
        loadProduitCategory()
    }, [])
    const load_produits = () => {
        HttpRequest('/app/produits/load?limit=10&page=1', 'GET').then(response => {
            setListCategorie(response.data.data.rows)
        }).catch(error => {
            console.error(error)
        })
    }

    const createProduit = () => {

        HttpRequest('/app/produits/create', 'POST', {
            "reference": "P-20202",
            "name": "Veste Croisé",
            "prix_min": 10,
            "prix_max": 100,
            "qte_min": 30,
            "categorie": "Homme",
            "description": "Je suis un bon produit"
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })

    }

    const loadProduitCategory = () => {

        HttpRequest('/app/produits/load-categories?limit=1000&page=1', 'GET').then(response => {
            console.log(response.data.data.rows)
            setListCategorie(response.data.data.rows)
        }).catch(error => {
            console.error(error)
        })

    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function showModalProduit() {
        setIsShowPopup(false)
        showModal()
    }

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const content = (
        <div>
            <Button style={{width: 200, marginBottom: 10}} onClick={showModalProduit}>Nouveau produit</Button><br/>
            <Button style={{width: 200, marginBottom: 10}}>Imprimer la fiche de stock</Button>
        </div>
    );


    return (
        <div className='root-home'>
            <Menus/>
            <div style={{marginLeft: 10, marginTop: 10}}>
                <h5>Liste des produits</h5>
                <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', marginRight: 10}}>
                    <DatePicker/>
                    <Popover placement="bottom" open={isShowPopup} title={<span>Options</span>} content={content}>
                        <Button onClick={() => setIsShowPopup(true)} className='button'>Options</Button>
                    </Popover>
                </div>
            </div>
            <br/>
            <AppTableProduis columns={columns} data={dataSource}/>

            <Modal title="Ajouter ou modifier un produit" open={isModalOpen} okText='Enrégistrer' cancelText='Fermer'
                   onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className='text-input-group'>
                    <label>Nom du produit</label>
                    <Input className='textInput2' value={name} onChange={(e) => setName(e.target.value)}
                           placeholder=""/>
                </div>
                <div className='text-input-group'>
                    <label>Catérogie du produit</label>
                    <Select className='textInput2'
                            showSearch
                            placeholder="Selectionner"
                            onChange={onChange}
                            onSearch={onSearch}
                    >
                        {
                            listCategorie.map((item: any) => {
                                return <Option value={item.name}>{item.name}</Option>
                            })
                        }

                    </Select>
                </div>
                <div className='row'>
                    <div className='text-input-group col-md-6'>
                        <label>Prix unitaire</label>
                        <InputNumber className='textInput2' onChange={(e) => setQteMin(e.target.value)}/>
                    </div>
                    <div className='text-input-group col-md-6'>
                        <label>Quantité d'alerte</label>
                        <InputNumber className='textInput2' value={qte_min}
                                     onChange={(e) => setQteMin(e.target.value)}/>
                    </div>
                </div>
                <div className='text-input-group'>
                    <label>Description</label>
                    <TextArea className='textInput2' value={description}
                              onChange={(e) => setDescription(e.target.value)} placeholder=""/>
                </div>
                <div className='text-input-group'>
                    <label>Images</label>
                    <ImgCrop rotationSlider>
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChangeImage}
                            onPreview={onPreview}
                        >
                            {fileList.length < 5 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </div>
                <div>
                    <Button className='button' onClick={() => createProduit}>Ajouter</Button>
                </div>

            </Modal>
        </div>


    )
}

export default AppProduits