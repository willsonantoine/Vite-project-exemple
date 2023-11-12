import img from '../assets/error-img.png'

const NotFound = () => {

    return (
        <div className='row' style={{textAlign: 'center', paddingTop: 50}}>
            <div className='col-md-2'></div>
            <div className='col-md-4' >
                <img src={img} alt='logo' height={200}/>
            </div>
            <div className='col-md-4 ' id='rigth-login-dif'>
                <div style={{paddingTop: 50, textAlign: "center"}}>
                    <h3>Page non trouvée</h3>
                    <h6 style={{fontSize: 12, color: '#35597B'}}>La page que vous essayez de charger n'existe pas</h6>
                </div>
            </div>
            <div className='col-md-2'></div>
        </div>)
}

export default NotFound