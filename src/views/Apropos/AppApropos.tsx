import MenuRoot from "../../Components/MenuRoot.tsx";
import '../../assets/styles/Apropos.css'
import Flooter from "../../Components/Flooter.tsx";

function Apropos() {
    return (
        <div className='root-home-apropos'>
            <MenuRoot/>
            <div className="mlinzi-system-container">
                <h5 className="mlinzi-system-title">Simplifiez Votre Gestion</h5>
                <p className="mlinzi-system-description">
                    Bienvenue dans l'univers de la gestion simplifiée avec <strong>Mlinzi System</strong> <br/>
                    Notre systèm vous accompagne au quotidien pour atteindre vos objectifs. Que vous soyez une
                    petite entreprise ou une grande organisation, nous avons conçu <strong>Mlinzi System</strong> pour vous aider à
                    gérer vos opérations de manière efficace et transparente.
                </p>
                <br/>
                <div className="row" style={{alignSelf:'center',justifyContent:'center'}}>
                    <div className="feature col-md-5">
                        <h2>Gestion de Stock et Facturation</h2>
                        <p>Suivez vos stocks en temps réel.</p>
                        <p>Générez des factures rapidement et efficacement.</p>
                        <p>Simplifiez la gestion de vos transactions.</p>
                    </div>
                    <div className="feature col-md-5">
                        <h2>Gestion de Caisse (Entrées et Sorties)</h2>
                        <p>Enregistrez vos mouvements de trésorerie.</p>
                        <p>Gardez une vue d'ensemble de vos flux financiers.</p>
                        <p>Facilitez votre comptabilité quotidienne.</p>
                    </div>
                    <div className="feature col-md-5">
                        <h2>Envoi et Réception de SMS avec SendName</h2>
                        <p>Communiquez de manière personnalisée avec vos clients et partenaires.</p>
                        <p>Utilisez notre service d'envoi de SMS pour informer, alerter ou promouvoir.</p>
                    </div>
                    <div className="feature col-md-5">
                        <h2>Conception de Systèmes Informatiques</h2>
                        <p>Besoin d'une solution sur mesure ? Nous concevons des systèmes informatiques adaptés à vos
                            spécifications.</p>
                        <p>Automatisez vos processus internes pour gagner en efficacité.</p>
                    </div>
                    <div className="feature col-md-5">
                        <h2>Conception et Hébergement de Sites Web</h2>
                        <p>Créez une présence en ligne solide avec notre expertise en conception de sites web.</p>
                        <p>Nous assurons également l'hébergement pour une visibilité optimale.</p>
                    </div>
                </div>
            </div>
            <Flooter/>
        </div>
    );
};

export default Apropos;