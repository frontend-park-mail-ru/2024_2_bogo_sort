'use strict';

const MONTHS = {
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
    12: 'декабря'
};

export function timestampFormatter(timestamp, includeYear) {
    let [year, month, day] = timestamp.slice(0, 10).split('-');
    day = String(parseInt(day));  //избавляемся от нуля '01' -> '1'
    month = MONTHS[Number(month)];

    if(includeYear){
        return day + ' ' + month + ' ' + year;
    }
    return day + ' ' + month;
}