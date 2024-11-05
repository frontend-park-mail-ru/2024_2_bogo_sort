'use strict';

export function timestampFormatter(timestamp, includeYear) {
    timestamp = timestamp.slice(0, 10).split('-');
    timestamp[2] = String(Number(timestamp[2]));  //избавляемся от нуля '01' -> '1'
    let month;
    switch(Number(timestamp[1])) {
        case 1:
            month = 'января';
            break
        case 2:
            month = 'февраля';
            break
        case 3:
            month = 'марта';
            break
        case 4:
            month = 'апреля';
            break
        case 5:
            month = 'мая';
            break
        case 6:
            month = 'июня';
            break
        case 7:
            month = 'июля';
            break
        case 8:
            month = 'августа';
            break
        case 9:
            month = 'сентября';
            break 
        case 10:
            month = 'октября';
            break
        case 11:
            month = 'ноября';
            break
        case 12:
            month = 'декабря';
            break
    }

    if(includeYear){
        return timestamp[2] + ' ' + month + ' ' + timestamp[0];
    }
    return timestamp[2] + ' ' + month;
}