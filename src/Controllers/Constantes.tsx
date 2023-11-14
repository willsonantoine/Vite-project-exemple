import {formatDistanceStrict} from 'date-fns';

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


export default {getMessage, formatDate, geDateFormat}