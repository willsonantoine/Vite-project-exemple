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
import {useState} from "react";
import ImgCrop from 'antd-img-crop';
import {RcFile} from "antd/es/upload";
import AppTableProduis from "./AppTableProduit.tsx";
import {ColumnsType} from "antd/es/table";
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
function AppProduit() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onChangeImage: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    const { TextArea } = Input;
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

// Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
            <AppTableProduis columns={columns} data={dataSource} />

            <Modal title="Ajouter ou modifier un produit" open={isModalOpen} okText='Enrégistrer' cancelText='Fermer'
                   onOk={handleOk} onCancel={handleCancel}>
                <div className='text-input-group'>
                    <label>Nom du produit</label>
                    <Input className='textInput2' placeholder=""/>
                </div>
                <div className='text-input-group'>
                    <label>Catérogie du produit</label>
                    <Select className='textInput2'
                            showSearch
                            placeholder="Selectionner"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                    />
                </div>
                <div className='row'>
                    <div className='text-input-group col-md-6'>
                        <label>Prix unitaire</label>
                        <InputNumber className='textInput2'/>
                    </div>
                    <div className='text-input-group col-md-6'>
                        <label>Quantité d'alerte</label>
                        <InputNumber className='textInput2'/>
                    </div>
                </div>
                <div className='text-input-group'>
                    <label>Description</label>
                    <TextArea className='textInput2'  placeholder=""/>
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

            </Modal>
        </div>


    )
}

export default AppProduit