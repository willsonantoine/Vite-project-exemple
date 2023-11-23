import HttpRequest from "./HttpRequest.tsx";
import constantes from "./Constantes.tsx";

const syncData = () => {
    const factures = localStorage.getItem('factures');
    const id_service = constantes.getIdService();
    if (factures) {
        const data = JSON.parse(factures);
        if (data) {
            const updatedData = data.map((item: FactureInterface) => {
                if (!item.synchro) {
                    return updateFactureSynchro(item);
                }
                return item;
            });

            updatedData.forEach((item: FactureInterface) => {
                HttpRequest("/app/factures/create/" + id_service, 'POST', item)
                    .then(response => {
                        if (response.data.success === 200) {
                            // Mettre à jour l'état de synchronisation de la facture localement
                            const updatedFacture = updateFactureSynchro(item);
                            console.log("Facture synchronisée :", updatedFacture);
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            });

            // Enregistrer le tableau modifié dans le localStorage
            localStorage.setItem('factures', JSON.stringify(updatedData));
        }
    }
};

const updateFactureSynchro = (facture: FactureInterface): FactureInterface => {
    if (!facture.synchro) {
        const updatedFacture: FactureInterface = {
            ...facture,
            synchro: true,
            synchroAt: new Date().toISOString()
        };
        return updatedFacture;
    }
    return facture;
};

export default syncData;