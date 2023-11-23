import '../assets/styles/RootApp.css'
import Menus from "../Components/Menus.tsx";
import CreatableSelect from "react-select/creatable";
import { useEffect, useState} from "react";
import HttpRequest from "../Controllers/HttpRequest.tsx";

function AppRoot() {
    const [optionsService, setOptionsService] = useState([]);
    useEffect(() => {
        LoadService();
    }, [])

    function LoadService() {
        HttpRequest('/user/services/options', 'GET').then((response) => {
            const data = response.data.data;
            setOptionsService(data);
        }).catch((error) => {
            console.log(error)
        })
    }

    function changeClientName(value:any) {
        if(value){
            localStorage.setItem("id_service",value.value);
        }
    }
    return (
        <div className='root-home'>
            <Menus/>
           <div className='form-group'>
               <label>Service</label>
               <CreatableSelect className='textInput3' placeholder='Service' onChange={changeClientName}
                                isClearable options={optionsService} ></CreatableSelect>
           </div>
        </div>

    )
}


export default AppRoot