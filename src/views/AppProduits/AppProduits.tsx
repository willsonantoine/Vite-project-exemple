import '../../assets/styles/RootApp.css'
import Menus from "../../Components/Menus.tsx";
import '../../assets/styles/AppProduit.css'
import {
    Button,
    DatePicker,
    Input,
    Modal,
    Popover,
    Select, Spin,
    Upload,
    UploadFile,
    UploadProps
} from "antd";
import {useEffect, useState} from "react";
import ImgCrop from 'antd-img-crop';
import {RcFile} from "antd/es/upload";
import HttpRequest from "../../Controllers/HttpRequest.tsx";
import {Option} from "antd/es/mentions";
import NotificationAlert from "../../Components/NotificationAlert.tsx";
import constantes from "../../Controllers/Constantes.tsx";
import Images from "../../Components/Images.tsx";
import {IoIosAddCircleOutline} from "react-icons/io";
import {MdEditNote} from "react-icons/md";
import {CiMenuKebab} from "react-icons/ci";
import CreatableSelect from 'react-select/creatable';


function AppProduits() {

    const [optionsFournisseur, setOptionsFournisseur] = useState([]);
    const [ListProduits, setListProduits] = useState([]);
    const [ListServices, setListServices] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenApprov, setIsModalOpenApprov] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isShowPopupProduitList, setIsShowPopupProduitList] = useState(Array(ListProduits.length).fill(false));
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [name, setName] = useState('')
    const [categorie, setCategorie] = useState('')
    const [prix_min, setPrixMin] = useState('0')
    const [prix_max, setPrixMax] = useState('0')
    const [qte_min, setQteMin] = useState('0')
    const [description, setDescription] = useState('')
    const [listCategorie, setListCategorie] = useState([])
    const [reference, setReference] = useState('')

    const [messageAlert, setMessageAlert] = useState('')
    const [messageAlertType, setMessageAlertType] = useState(false)
    const [isShowMessageAlert, setIsShowMessageAlert] = useState(false)
    const [isPin, setIsPin] = useState(false)

    // Approvisionnement
    const [id_service, setIdServcie] = useState('')
    const [fournisseur, setFournisseur] = useState('')
    const [ref_justificative, setRefJustificative] = useState('')
    const [type, setTye] = useState('')
    const [qte, setQte] = useState('')
    const [descriptionApprov, setDescriptionApprov] = useState('')
    const [id_produit, setIdProduit] = useState('')

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
        setIdServcie(constantes.getIdService())
        load_produits()
        loadProduitCategory()
        loadServices();
        loadFournisseur();

    }, [])

    const load_produits = () => {
        HttpRequest('/app/produits/load?limit=10&page=1', 'GET').then(response => {
            setListProduits(response.data.data.rows)
            console.log(ListProduits)
        }).catch(error => {
            console.error(error)
        })
    }

    const createProduit = () => {
        setIsPin(true)

        HttpRequest('/app/produits/create', 'POST', {
            "reference": reference,
            "name": name,
            "prix_min": prix_min,
            "prix_max": prix_max,
            "qte_min": qte_min,
            "categorie": categorie,
            "description": description
        }).then(response => {
            const data = response.data;
            if (data.status === 200) {
                setIsModalOpen(false);
                load_produits()
            }
            showAlertMessage(data.message, data.status === 200)
            setIsPin(false)
        }).catch(error => {
            showAlertMessage(constantes.getMessage(error), false)
            setIsPin(false)
        })

    }

    const createApprovisionnement = () => {
        if (fournisseur != null && qte != null && type != null) {
            setIsPin(true)

            HttpRequest('/app/produits/approvisionner', 'POST', {
                "provenance": fournisseur,
                "id_produit": id_produit,
                "id_service": id_service,
                "ref_justificatif": ref_justificative,
                "qte": qte,
                "type": type,
                "prix_achat": 30,
                "observation": descriptionApprov
            }).then(response => {
                const data = response.data;
                if (data.status === 200) {
                    setIsModalOpen(false);
                    load_produits()
                }
                showAlertMessage(data.message, data.status === 200)
                setIsPin(false)
            }).catch(error => {
                showAlertMessage(constantes.getMessage(error), false)
                setIsPin(false)
            })
        } else {
            showAlertMessage("Vous devez completer la quantité ,type et la provenance", false)
        }


    }

    const loadProduitCategory = () => {

        HttpRequest('/app/produits/load-categories', 'GET').then(response => {
            setListCategorie(response.data.data)
        }).catch(error => {
            console.error(error)
        })

    }

    const loadFournisseur = () => {

        HttpRequest('/app/produits/load-fournisseur', 'GET').then(response => {
            setOptionsFournisseur(response.data.data)

        }).catch(error => {
            console.error(error)
        })

    }

    const loadServices = () => {

        HttpRequest('/user/services?page=1&limit=100', 'GET').then(response => {
            setListServices(response.data.data.rows)
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

    const handleOkApprov = () => {
        setIsModalOpenApprov(false);
    };

    const handleCancelApprov = () => {
        setIsModalOpenApprov(false);
    };

    function showModalApprov(id_produit: string) {
        setIdProduit(id_produit);
        console.log(id_produit);
        setIsModalOpenApprov(true);
    }

    function showModalProduit() {
        setIsShowPopup(false)
        showModal()
    }

    function showModalProduitUpdate(id_produit: string) {
        console.log(id_produit)
        setIdProduit(id_produit);
        setIsShowPopup(false)
        showModal()
    }


    const onChangeType = (value: string) => {
        setTye(value)
    };
    const onChangeIdService = (value: string) => {
        setIdServcie(value)
    };
    const content = (
        <div>
            <Button style={{width: 200, marginBottom: 10}} onClick={showModalProduit}>Nouveau produit</Button><br/>
            <Button style={{width: 200, marginBottom: 10}}>Imprimer la fiche de stock</Button>
        </div>
    );

    function showAlertMessage(message: string, type: boolean) {
        setIsShowMessageAlert(true);
        setMessageAlertType(type)
        setMessageAlert(message)
    }

    const closePopover = (index: number) => {
        setIsShowPopupProduitList(prevState => {
            const newState = [...prevState];
            newState[index] = false; // Ferme le Popover spécifique à l'index
            return newState;
        });
    };

    function changeFourisseur(selectedOption: any) {

        if (selectedOption) {
            setFournisseur(selectedOption.value);
        } else {
            setFournisseur('');
        }

    }

    function changeCategorie(selectedOption: any) {

        if (selectedOption) {
            setCategorie(selectedOption.value);
        } else {
            setCategorie('');
        }

    }

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
            {
                isShowMessageAlert ?
                    <NotificationAlert message={messageAlert} type={messageAlertType}/> : ''
            }
            <br/>
            <div>
                <div className='table-large'>
                    <table className="table header-border table-responsive-sm tbl-common">
                        <thead>
                        <tr>
                            <th>REFERENCE</th>
                            <th></th>
                            <th>Nom</th>
                            <th>Qte</th>
                            <th>Prix</th>
                            <th>Catégorie</th>
                            <th>Modifié le</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            ListProduits.map((item: any, i) => {
                                return (
                                    <tr key={i}>
                                        <td><strong>{item.reference}</strong></td>
                                        <td><img src={Images.default_product} height={30}/></td>
                                        <td>{item.name}</td>
                                        <td><span style={{
                                            backgroundColor: (item.qte_min > item.qte) ? 'red' : "green",
                                            padding: 5,
                                            color: "white", borderRadius: 10
                                        }}>{item.qte}</span></td>
                                        <td>{item.prix_max}</td>
                                        <td>{item.ProduitsCategorie.name}</td>
                                        <td>{constantes.geDateFormat(item.updatedAt)}</td>
                                        <td>
                                            <div className='btn-group'>
                                                <Button className='button-icon'
                                                        onClick={() => showModalProduitUpdate(item.id)}><MdEditNote/></Button>
                                                <Button className='button-icon'
                                                        onClick={() => showModalApprov(item.id)}>
                                                    <IoIosAddCircleOutline/> </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className='table-mobile' style={{marginLeft: 10}}>
                    {
                        ListProduits.map((item: any, i) => {
                            return (
                                <div key={i}
                                     style={{
                                         backgroundColor: "white",
                                         borderRadius: 5,
                                         paddingLeft: 5,
                                         marginTop: 5,
                                         marginLeft: 4,
                                         height: 50
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
                                            <div style={{textAlign: 'center', marginTop: 10, marginRight: 10}}>
                                                <img src={Images.default_product} height={30}/>
                                            </div>
                                            <div>
                                                <h5>{item.name}</h5>
                                                <span>{item.ProduitsCategorie.name}</span>
                                            </div>

                                        </div>
                                        <div
                                            style={{
                                                marginRight: 10,
                                                marginTop: 3,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                            <div>
                                                <span><strong style={{fontSize: 17}}>{item.qte}</strong> Pcs</span><br/>
                                                <span>{item.prix_max} USD</span>
                                            </div>
                                            <div style={{color: "red", fontSize: 30}}>
                                                <Popover key={i} placement="bottom" open={isShowPopupProduitList[i]}
                                                         title={<span>{item.name}</span>} content={
                                                    <div>
                                                        <span>Prix Min : {item.prix_min};<br/> Prix Max :{item.prix_max}<br/>Qte Min : {item.qte_min}<br/>
                                                            Catégorie : {item.ProduitsCategorie.name} <br/> </span>
                                                        <Button style={{width: 200, marginBottom: 10}}
                                                                onClick={() => {
                                                                    showModalProduitUpdate(item.id);
                                                                    closePopover(i)
                                                                }}>Modifier</Button><br/>
                                                        <Button
                                                            style={{width: 200, marginBottom: 10}}
                                                            onClick={() => {
                                                                showModalApprov(item.id), closePopover(i)
                                                            }}>Approvisionner</Button><br/>
                                                        <Button
                                                            style={{width: 200, marginBottom: 10}}>Historique</Button>
                                                    </div>
                                                }>
                                                    <CiMenuKebab key={i}
                                                                 onClick={() => setIsShowPopupProduitList(prevState => {
                                                                     const newState = [...prevState];
                                                                     newState[i] = !newState[i]; // Inverse l'état spécifique à l'index i
                                                                     return newState;
                                                                 })}/>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <Modal title="Ajouter ou modifier un produit" open={isModalOpen} okText='Enrégistrer'
                   cancelText='Fermer'
                   onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className='row'>
                    <div className='col-md-8'>
                        {
                            isShowMessageAlert ?
                                <NotificationAlert message={messageAlert} type={messageAlertType}/> : ''
                        }

                    </div>
                    <div className='text-input-group col-md-8'>
                        <label>Nom du produit</label>
                        <Input className='textInput2' value={name} onChange={(e) => setName(e.target.value)}
                               placeholder=""/>
                    </div>
                    <div className='text-input-group col-md-4'>
                        <label>Référence</label>
                        <Input className='textInput2' value={reference}
                               onChange={(e) => setReference(e.target.value)}/>
                    </div>
                    <div className='text-input-group col-md-12'>
                        <label>Catérogie du produit</label>
                        <CreatableSelect className='textInput2'

                                         onChange={changeCategorie}

                                         isClearable options={listCategorie}/>
                    </div>

                    <div className='text-input-group col-md-4'>
                        <label>Prix Min</label>
                        <Input className='textInput2' value={prix_min}
                               onChange={(e) => setPrixMin(e.target.value)}/>
                    </div>
                    <div className='text-input-group col-md-4'>
                        <label>Prix Max</label>
                        <Input className='textInput2' value={prix_max}
                               onChange={(e) => setPrixMax(e.target.value)}/>
                    </div>
                    <div className='text-input-group col-md-4'>
                        <label>Qte d'alerte</label>
                        <Input className='textInput2' value={qte_min}
                               onChange={(e) => setQteMin(e.target.value)}/>
                    </div>

                    <div className='text-input-group col-md-12'>
                        <label>Description</label>
                        <TextArea className='textInput2' value={description}
                                  onChange={(e) => setDescription(e.target.value)} placeholder=""/>
                    </div>
                    <div className='text-input-group col-md-12'>
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
                        <Button disabled={isPin} className='button' onClick={createProduit}>Ajouter {isPin ?
                            <Spin/> : ``}</Button>
                    </div>
                </div>


            </Modal>

            <Modal title="Approvisionnement" open={isModalOpenApprov}
                   onOk={handleOkApprov} onCancel={handleCancelApprov} footer={null}>
                <div className='row'>
                    <div className='col-md-8'>
                        {
                            isShowMessageAlert ?
                                <NotificationAlert message={messageAlert} type={messageAlertType}/> : ''
                        }

                    </div>
                    <div className='text-input-group col-md-8'>
                        <label>Point de vente</label>
                        <Select className='textInput2'
                                placeholder="Selectionner"
                                onChange={onChangeIdService}
                        >
                            {
                                ListServices.map((item: any) => {
                                    return (<Option value={item.id}>{item.name}</Option>)
                                })
                            }

                        </Select>

                    </div>
                    <div className='text-input-group col-md-8'>
                        <label>Provenance</label>
                        <CreatableSelect className='textInput2' onChange={changeFourisseur} isClearable
                                         options={optionsFournisseur}/>
                    </div>
                    <div className='text-input-group col-md-4'>
                        <label>Réf Justificatif</label>
                        <Input className='textInput2' value={ref_justificative}
                               onChange={(e) => setRefJustificative(e.target.value)}/>
                    </div>
                    <div className='text-input-group col-md-8'>
                        <label>Type</label>
                        <Select className='textInput2'
                                showSearch
                                placeholder="Selectionner"
                                onChange={onChangeType}
                        >
                            <Option value='CASH'>Cash</Option>
                            <Option value='CREDIT'>Crédit</Option>
                            <Option value='PRODUCTION'>Production</Option>
                        </Select>
                    </div>

                    <div className='text-input-group col-md-4'>
                        <label>Quantité</label>
                        <Input className='textInput2' value={qte}
                               onChange={(e) => setQte(e.target.value)}/>
                    </div>

                    <div className='text-input-group col-md-12'>
                        <label>Description</label>
                        <TextArea className='textInput2' value={descriptionApprov}
                                  onChange={(e) => setDescriptionApprov(e.target.value)} placeholder=""/>
                    </div>
                    <br/>
                    <div className='text-input-group col-md-8'>
                        <Button disabled={isPin} className='button' onClick={createApprovisionnement}>Ajouter {isPin ?
                            <Spin/> : ``}</Button>
                    </div>
                </div>


            </Modal>
        </div>


    )
}

export default AppProduits