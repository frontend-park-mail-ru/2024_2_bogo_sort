import { Months } from '../constants/sharedTypes.ts';

const MONTHS: Months = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря',
};

export function timestampFormatter(timestamp: string, includeYear: boolean) {
    let [year, month, day] = timestamp.slice(0, 10).split('-');
    day = String(parseInt(day));
    month = MONTHS[Number(month)];

    if(includeYear){
        return day + ' ' + month + ' ' + year;
    }

    return day + ' ' + month;
}
