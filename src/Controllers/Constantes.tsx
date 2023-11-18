import {formatDistanceStrict} from 'date-fns';
import moment, {Moment} from "moment";

const getMessage = (error: any): string | any => {
    let code = 200;
    let message = 'Une erreur inattendue s\'est produite.';
    if (error.response) {
        code = error.response.status;
        message = error.response.data.message;
    }

    switch (code) {
        case 200:
            return 'Success';
        case 401:
            return 'Unauthorized - Non autorisé.';
        case 403:
            return 'Forbidden - Accès refusé.';
        case 404:
            return 'Not Found - Ressource non trouvée.';
        case 409:
            return 'Conflict - Conflit de données.';
        case 422:
            return 'Unprocessable Entity - Entité non traitable.';
        case 500:
            return 'Internal Server Error - Erreur interne du serveur.';
        case 400: return  message;
        default:
            return 'Une erreur inattendue s\'est produite.';
    }
};

function geDateFormat(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    const now = new Date();
    const relativeDate = formatDistanceStrict(date, now, {addSuffix: true});
    return relativeDate;
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateString(dateString: string | number | Date) {
    const date = new Date(dateString);

    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    // Formater la date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

function formatDateString2(dateString: string): Moment {
    const date = moment(dateString);

    // Vérifier si la date est valide
    if (!date.isValid()) {
        throw new Error('Invalid date');
    }

    return date;
}


export default {getMessage, geDateFormat, formatDateString, formatDateString2, getCurrentDate}