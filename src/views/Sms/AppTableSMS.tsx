import {Table} from "antd";




type Column = { /* Définissez la structure de vos colonnes ici */ }
type Data = { /* Définissez la structure de vos données ici */ }

interface AppTableProduisProps {
    columns: Column[];
    data: Data[];
}
function AppTableProduis({ columns, data }: AppTableProduisProps) {

    return (
        <div>
            <Table columns={columns} dataSource={data} className='table-large'/>
            <div className='table-mobile'></div>
        </div>

    )
}

export default AppTableProduis