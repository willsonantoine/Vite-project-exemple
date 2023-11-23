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
type CardContact = {
    name: string;
    phone: string;
    id: number;
    user_contact:{
        id: number;
        phone: string;
    }
}

type FactureInterface = {
    reference:string,
    client_name: string,
    amount: number,
    currency: string,
    number: string,
    date: string,
    synchro: boolean;
    synchroAt: any;
    details: CardPanier[]
}

type CardMessage = {
    reference: string;
    phone: string;
    message: string;
    status: boolean;
    createdAt: string;
    user_to: {
        id: number;
        name: string;
        phone: string;
        gender: string;
    }
}

type SelectOptions = {
    value: string;
    label: string;
}

type SelectOptionsContact = {
    name: string;
    phone: string;
}
