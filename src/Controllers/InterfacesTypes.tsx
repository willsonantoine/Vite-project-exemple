type CardNombreProps = {
    numero: number;
    label: string
}

type CardPanier = {
    index: number;
    name: string;
    prix: number;
    qte: number;
    prix_total: number;
}

type CardProduitList = {
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
    details: CardPanier[]
}