type CardNombreProps = {
    numero: number;
    label: string
}

type CardPanier = {
    id: number;
    index: number;
    name: string;
    prix: number;
    qte: number;
    prix_total: number;
}

type CardProduitList = {
    index: number;
    name: string;
    prix_min: number;
    prix_max: number;
    id: number
}


type FactureInterface = {
    client_name: string,
    amount: number,
    currency: string,
    number: number,
    date: string,
    synchro: boolean;
    synchroAt: any;
    details: CardPanier[]
}