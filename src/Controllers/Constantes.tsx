import {formatDistanceStrict} from 'date-fns';
import moment, {Moment} from "moment";

const getMessage = (error: Error | any): string | any => {
    let code = 200;
    if (error.response) {
        code = error.response.status;
    }

    switch (code) {
        case 200:
            return 'Success';
        case 409:
            return 'Désolé Il semble que le nom ou la référence existe déjà dans le système.';
    }
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: any = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    };
    const formattedDate = `${date.toLocaleDateString('en-US', options)}`;
    return formattedDate;
}

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
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

function formatDateString(dateString: moment.Moment) {
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


export default {getMessage, formatDate, geDateFormat, formatDateString, formatDateString2, getCurrentDate}