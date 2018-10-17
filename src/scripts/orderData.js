export default {
    order_qualification,
    order_date
}

export function order_qualification(a, b){
    if (a.qualification < b.qualification)
        return 1;
    if (a.qualification > b.qualification)
        return -1;           
    return 0;
}
    
export function order_date(a, b){
    if (a.date < b.date)
        return 1;
    if (a.date > b.date)
        return -1;           
    return 0;
}