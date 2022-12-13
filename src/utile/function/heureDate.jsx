export function parsDate(date){
    return ({
        jourMonth : date.getDate(),
        jourSemaine : date.getDay(),
        month : date.getMonth(),
        years : date.getFullYear(),
        hour : date.getHours(),
        min : date.getMinutes()
    });
}

export function checkGoodDay(date1,recurance, date2){
    if (date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear())
        return (true);
    else if ((recurance === 'Toutes les semaines' && date1.getDay() === date2.getDay() && date2.getTime() >= date1.getTime()) || 
        (recurance === 'Tout les mois' && date1.getDate() === date2.getDate()) || 
        (recurance === 'Tout les ans' && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()))
        return (true);
    
    return (false);
}

export function checkSameDay(date1, date2){
    if (date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear())
        return (true);
    return (false);
}

export function checkWichBigDay(date1, date2){
    if (date1.getFullYear() > date2.getFullYear() || 
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() > date2.getMonth()) ||
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() > date2.getDate()) || 
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getHours() > date2.getHours()) || 
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getHours() === date2.getHours() && date1.getMinutes() > date2.getMinutes()))
    {
        return (1);
    }
    else if (date1.getFullYear() < date2.getFullYear() || 
    (date1.getFullYear() < date2.getFullYear() && date1.getMonth() < date2.getMonth()) ||
    (date1.getFullYear() < date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() < date2.getDate()) || 
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getHours() < date2.getHours()) || 
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getHours() === date2.getHours() && date1.getMinutes() < date2.getMinutes()))
    {
        return (2);
    }
    else 
        return (0);
}

export function arrondiDate(date, arround)
{
    let res = date.getTime();
    let milliSeconde = date.getMilliseconds() - 1;
    let seconde = date.getSeconds() * 1000;
    let minute = date.getMinutes() * 60 * 1000;
    let hours = date.getHours() * 60 * 60 * 1000;
    let day = (date.getDate() - 1) * 24 * 60 * 60 * 1000;
    if (arround >= 1)
        res -=  milliSeconde;
    if (arround >= 2)
        res -=  seconde;    
    if (arround >= 3)
        res -=  minute;    
    if (arround >=  4)
        res -= hours;    
    if (arround >= 5)
        res -= day;    
    return (res);
}