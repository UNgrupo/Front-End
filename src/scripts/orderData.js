const sortAlgorithms = {
    orderQualificationGreater,
    orderQualificationLess,
    orderDateGreater,
    orderDateLess
};

export default sortAlgorithms;

function orderQualificationGreater(a, b){
    if (a.attributes.qualification < b.attributes.qualification)
        return 1;
    if (a.attributes.qualification > b.attributes.qualification)
        return -1;           
    return 0;
}

function orderQualificationLess(a, b){
    if (a.attributes.qualification > b.attributes.qualification)
        return 1;
    if (a.attributes.qualification < b.attributes.qualification)
        return -1;           
    return 0;
}
    
function orderDateGreater(a, b){
    if (a.attributes.date < b.attributes.date)
        return 1;
    if (a.attributes.date > b.attributes.date)
        return -1;           
    return 0;
}
    
function orderDateLess(a, b){
    if (a.attributes.date > b.attributes.date)
        return 1;
    if (a.attributes.date < b.attributes.date)
        return -1;           
    return 0;
}